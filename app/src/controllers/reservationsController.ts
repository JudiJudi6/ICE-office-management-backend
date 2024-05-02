import { Response, Request } from "express";
import { OfficeModel } from "../models/officeModel";
import mongoose from "mongoose";

export async function getDeskReservations(req: Request, res: Response) {
  try {
    let reservations: any = [];
    const filter = {
      id: req.params.officeId,
      "deskList.deskId": req.params.deskId,
    };

    const desk = await OfficeModel.findOne(filter);

    if (!desk) {
      throw new Error("No office with given ID");
    } else {
      reservations = desk.deskList.find(
        (o) => o.deskId === req.params.deskId
      )?.reservationData;
    }
    if (reservations) {
      res.status(200).send({ status: "success", data: reservations });
    } else {
      throw new Error("Reservations could not be acquired");
    }
  } catch (error) {
    console.error("Reservations GET method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Reservations GET method failed",
      error: error,
    });
  }
}

export async function makeDeskReservations(req: Request, res: Response) {
  try {
    const newReservation = req.body;
    const filter = {
      id: req.params.officeId,
      "deskList.deskId": req.params.deskId,
    };

    const desk = await OfficeModel.findOne(filter);

    if (!desk) {
      throw new Error("No office with given ID");
    } else {
      const reservations = desk.deskList.find(
        (o) => o.deskId === req.params.deskId
      )?.reservationData;
      if (!reservations) {
        throw new Error("No desk with given ID in this office");
      } else {
        reservations?.push(newReservation);
      }
    }
    await desk.save();
    res.status(200).send({ status: "success", data: desk.deskList });
  } catch (error) {
    console.error("Reservation POST method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Reservation POST method failed",
      error: error,
    });
  }
}

export async function updateDeskReservation(req: Request, res: Response) {
  try {
    const filter = {
      id: req.params.officeId,
      "deskList.deskId": req.params.deskId,
      "deskList.reservationData.reservationId": req.params.reservationId,
    };
    const update = {
      $set: {
        "deskList.$.reservationData": {
          userId: req.body.userId,
          user: { name: req.body.user.name, surname: req.body.user.surname },
          startTime: req.body.startTime,
          endTime: req.body.endTime,
        },
      },
    };

    const desk = await OfficeModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(desk);
    res.status(200).send({ status: "success", data: desk });
  } catch (error) {
    console.error("Reservations PATCH method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Reservations PATCH method failed",
      error: error,
    });
  }
}
