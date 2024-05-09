import express from "express";
import {
  getDeskReservations,
  makeDeskReservations,
  updateDeskReservation,
} from "../controllers/reservationsController";

const reservationsRouter = express.Router();

reservationsRouter
  .route("/:officeId/:deskId")
  .get(getDeskReservations)
  .post(makeDeskReservations);
reservationsRouter
  .route("/:officeId/:deskId/:reservationId")
  .patch(updateDeskReservation);

export default reservationsRouter;
