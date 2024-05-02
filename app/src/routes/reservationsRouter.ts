import express from "express";
import { getDeskReservations, makeDeskReservations } from "../controllers/reservationsController";

const reservationsRouter = express.Router();

reservationsRouter
  .route("/:officeId/:deskId")
  .get(getDeskReservations)
  .post(makeDeskReservations);

export default reservationsRouter;
