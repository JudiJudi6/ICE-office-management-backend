import express from "express";
import { getOffice, sendOffice, joinOfficeByCode, getOfficeById } from "../controllers/officeController";

const officeRouter = express.Router();

officeRouter.route("/").get(getOffice).post(sendOffice);
officeRouter.route("/:invCode").post(joinOfficeByCode);
officeRouter.route("/:id").get(getOfficeById)


export default officeRouter;
