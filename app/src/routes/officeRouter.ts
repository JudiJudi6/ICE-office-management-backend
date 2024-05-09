import express from "express";
import { getOffice, sendOffice, joinOfficeByCode, getOfficeById, patchDeskAvailability } from "../controllers/officeController";

const officeRouter = express.Router();

officeRouter.route("/").get(getOffice).post(sendOffice);
officeRouter.route("/:invCode").post(joinOfficeByCode);
officeRouter.route("/:id").get(getOfficeById)
officeRouter.route("/:officeId/:deskId").patch(patchDeskAvailability)



export default officeRouter;
