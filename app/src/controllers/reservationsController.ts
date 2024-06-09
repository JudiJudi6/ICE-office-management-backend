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
        for (let i = 0; i < reservations.length; i++) {
          if((new Date(reservations[i].startTime) < new Date(newReservation.endTime) &&
          new Date(newReservation.startTime) < new Date(reservations[i].endTime))|| 
          (new Date(newReservation.startTime) >= new Date(newReservation.endTime))) {
            throw new Error("Can't add the reservation");
          }
        }
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


    let reservations: any = [];
    let reservation: any = [];
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
        const reservation = reservations.find(
          (o) => o.reservationId === req.params.reservationId
        );
        if (reservation){
          if(new Date(reservation.startTime) < new Date(req.body.endTime) &&
          new Date(req.body.startTime) < new Date(reservation.endTime) || 
          (new Date(reservation.startTime) >= new Date(reservation.endTime))) {
            throw new Error("Can't change the reservation");
          }
          reservation.startTime = req.body.startTime
          reservation.endTime = req.body.endTime
          await desk.save()
        }
      }
    }
    res.status(200).send({ status: "success", data: reservation });
  } catch (error) {
    console.error("Reservations PATCH method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Reservations PATCH method failed",
      error: error,
    });
  }
}

export async function deleteDeskReservation(req: Request, res: Response) {
  try {
    const filter = {
      id: req.params.officeId,
      "deskList.deskId": req.params.deskId,
      "deskList.reservationData.reservationId": req.params.reservationId,
    };


    let reservations: any = [];
    let reservation: any = [];
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
        const reservation = reservations.find(
          (o) => o.reservationId === req.params.reservationId
        );
        if (reservation){
          const index = reservations.indexOf(reservation)
          reservations.splice(index, 1)
          await desk.save()
        }
      }
    }
    res.status(200).send({ status: "success", data: reservations });
  } catch (error) {
    console.error("Reservations PATCH method error:", error);
    res.status(500).send({
      status: "failed",
      message: "Reservations PATCH method failed",
      error: error,
    });
  }
}
