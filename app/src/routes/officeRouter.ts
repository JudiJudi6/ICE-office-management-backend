import express from "express";
import { getOffice, sendOffice, joinOfficeByCode } from "../controllers/officeController";

const officeRouter = express.Router();

officeRouter.route("/").get(getOffice).post(sendOffice);
officeRouter.route("/:invCode").post(joinOfficeByCode);

export default officeRouter;
