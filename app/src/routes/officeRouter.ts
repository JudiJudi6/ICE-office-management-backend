import express from "express";
import { getOffice, sendOffice } from "../controllers/officeController";

const officeRouter = express.Router();

officeRouter.route("/").get(getOffice).post(sendOffice);

export default officeRouter;
