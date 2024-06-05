"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservationsController_1 = require("../controllers/reservationsController");
const reservationsRouter = express_1.default.Router();
reservationsRouter
    .route("/:officeId/:deskId")
    .get(reservationsController_1.getDeskReservations)
    .post(reservationsController_1.makeDeskReservations);
reservationsRouter
    .route("/:officeId/:deskId/:reservationId")
    .patch(reservationsController_1.updateDeskReservation)
    .delete(reservationsController_1.deleteDeskReservation);
exports.default = reservationsRouter;
