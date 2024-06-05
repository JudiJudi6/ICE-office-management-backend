"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const officeController_1 = require("../controllers/officeController");
const officeRouter = express_1.default.Router();
officeRouter.route("/").get(officeController_1.getOffice).post(officeController_1.sendOffice);
officeRouter.route("/:invCode").post(officeController_1.joinOfficeByCode);
officeRouter.route("/:id").get(officeController_1.getOfficeById);
officeRouter.route("/:officeId/:deskId").patch(officeController_1.patchDeskAvailability);
exports.default = officeRouter;
