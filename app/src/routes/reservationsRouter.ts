import express from "express";
import {
  getDeskReservations,
  makeDeskReservations,
  updateDeskReservation,
  deleteDeskReservation,
  getUserReservations
} from "../controllers/reservationsController";

const reservationsRouter = express.Router();

reservationsRouter
  .route("/:officeId/:deskId")
  .get(getDeskReservations)
  .post(makeDeskReservations);
reservationsRouter
  .route("/:officeId/:deskId/:reservationId")
  .patch(updateDeskReservation)
  .delete(deleteDeskReservation)
reservationsRouter
  .route("/:officeId/:userId/reservations")
  .get(getUserReservations)

export default reservationsRouter;
