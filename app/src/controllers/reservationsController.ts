import { Response, Request } from "express";
import { OfficeData, OfficeModel } from "../models/officeModel";
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
    }

    const deskData = desk.deskList.find((o) => o.deskId === req.params.deskId);
    if (!deskData) {
      throw new Error("No desk with given ID in this office");
    }

    const reservations = deskData.reservationData;
    if (!reservations) {
      throw new Error("No reservation data found for this desk");
    }

    const newStartTime = new Date(newReservation.startTime);
    const newEndTime = new Date(newReservation.endTime);
    const now = new Date();

    if (isNaN(newStartTime.getTime()) || isNaN(newEndTime.getTime())) {
      throw new Error("Invalid date format. Please use ISO format.");
    }

    if (newStartTime >= newEndTime) {
      throw new Error("Incorrect date range, please use the correct one");
    }

    if (newStartTime < now) {
      throw new Error("Cannot make a reservation for a past date");
    }

    for (let i = 0; i < reservations.length; i++) {
      const reservationStartTime = new Date(reservations[i].startTime);
      const reservationEndTime = new Date(reservations[i].endTime);

      if (
        newStartTime < reservationEndTime &&
        newEndTime > reservationStartTime
      ) {
        throw new Error("Date range is already taken, please try another one");
      }
    }

    reservations.push(newReservation);

    await desk.save();

    res.status(200).json({ status: "success", data: desk.deskList });
  } catch (error) {
    console.error("Reservation POST method error:", error);
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      status: "failed",
      message: "Reservation POST method failed",
      error: errorMessage,
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

    const desk = await OfficeModel.findOne(filter);

    if (!desk) {
      throw new Error("No office with given ID");
    }

    const deskData = desk.deskList.find((o) => o.deskId === req.params.deskId);
    if (!deskData) {
      throw new Error("No desk with given ID in this office");
    }

    const reservations = deskData.reservationData;
    const reservationData = reservations.find((o) => o.reservationId === req.params.reservationId);
    if (!reservationData) {
      throw new Error("No reservation with given ID in this desk");
    }

    const newStartTime = new Date(req.body.startTime);
    const newEndTime = new Date(req.body.endTime);
    const now = new Date();

    if (isNaN(newStartTime.getTime()) || isNaN(newEndTime.getTime())) {
      throw new Error("Invalid date format. Please use ISO format.");
    }

    if (newStartTime < now) {
      throw new Error("Cannot update reservation to a past date");
    }

    if (newStartTime >= newEndTime) {
      throw new Error("Incorrect date range, please use the correct one");
    }

    for (let i = 0; i < reservations.length; i++) {
      const reservationStartTime = new Date(reservations[i].startTime);
      const reservationEndTime = new Date(reservations[i].endTime);

      if (
        reservations[i].reservationId !== req.params.reservationId &&
        newStartTime < reservationEndTime &&
        newEndTime > reservationStartTime
      ) {
        throw new Error("Date range is already taken, please try another one");
      }
    }

    reservationData.startTime = req.body.startTime;
    reservationData.endTime = req.body.endTime;
    await desk.save();

    res.status(200).json({ status: "success", data: reservationData });
  } catch (error) {
    console.error("Reservations PATCH method error:", error);
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({
      status: "failed",
      message: "Reservations PATCH method failed",
      error: errorMessage,
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

export async function getUserReservations(req: Request, res: Response) {
  try {
    const reservations: any[] = [];
    const officeId = req.params.officeId;
    const userId = req.params.userId;

    // Ensure officeId and userId are provided
    if (!officeId || !userId) {
      return res.status(400).send({
        status: "failed",
        message: "Office ID and User ID are required",
      });
    }

    const filter = { id: officeId };
    console.log("Fetching office with filter:", filter);

    const office = await OfficeModel.findOne(filter);
    if (office) {
      console.log({
        id: office.id,
        name: office.name,
        address: office.address,
        deskList: office.deskList,
        authorId: office.authorId,
        users: office.users,
        invitationCode: office.invitationCode,
        __v: office.__v,
      });

      const deskList = office.deskList;
      if (deskList) {
        deskList.forEach((desk: any) => {
          desk.reservationData.forEach((reservation: any) => {
            if (reservation.userId === userId) {
              // Dodaj deskId oraz deskName do obiektu rezerwacji i przekształć go, aby zawierał tylko wymagane pola
              const reservationWithDeskInfo = {
                user: reservation.user,
                reservationId: reservation.reservationId,
                userId: reservation.userId,
                startTime: reservation.startTime,
                endTime: reservation.endTime,
                createdAt: reservation.createdAt,
                _id: reservation._id,
                deskId: desk.deskId,
                deskName: desk.deskName
              };
              reservations.push(reservationWithDeskInfo);
            }
          });
        });
      }

      console.log("Reservations:", reservations);
      res.status(200).send({ reservations });
    } else {
      return res.status(404).send({
        status: "failed",
        message: "Office not found",
      });
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