"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeskReservation = exports.updateDeskReservation = exports.makeDeskReservations = exports.getDeskReservations = void 0;
const officeModel_1 = require("../models/officeModel");
function getDeskReservations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let reservations = [];
            const filter = {
                id: req.params.officeId,
                "deskList.deskId": req.params.deskId,
            };
            const desk = yield officeModel_1.OfficeModel.findOne(filter);
            if (!desk) {
                throw new Error("No office with given ID");
            }
            else {
                reservations = (_a = desk.deskList.find((o) => o.deskId === req.params.deskId)) === null || _a === void 0 ? void 0 : _a.reservationData;
            }
            if (reservations) {
                res.status(200).send({ status: "success", data: reservations });
            }
            else {
                throw new Error("Reservations could not be acquired");
            }
        }
        catch (error) {
            console.error("Reservations GET method error:", error);
            res.status(500).send({
                status: "failed",
                message: "Reservations GET method failed",
                error: error,
            });
        }
    });
}
exports.getDeskReservations = getDeskReservations;
function makeDeskReservations(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const newReservation = req.body;
            const filter = {
                id: req.params.officeId,
                "deskList.deskId": req.params.deskId,
            };
            const desk = yield officeModel_1.OfficeModel.findOne(filter);
            if (!desk) {
                throw new Error("No office with given ID");
            }
            else {
                const reservations = (_a = desk.deskList.find((o) => o.deskId === req.params.deskId)) === null || _a === void 0 ? void 0 : _a.reservationData;
                if (!reservations) {
                    throw new Error("No desk with given ID in this office");
                }
                else {
                    for (let i = 0; i < reservations.length; i++) {
                        if ((reservations[i].startTime < newReservation.endTime) && (newReservation.startTime < reservations[i].endTime)) {
                            throw new Error("Can't add reservation (it's already taken)");
                        }
                    }
                    reservations === null || reservations === void 0 ? void 0 : reservations.push(newReservation);
                }
            }
            yield desk.save();
            res.status(200).send({ status: "success", data: desk.deskList });
        }
        catch (error) {
            console.error("Reservation POST method error:", error);
            res.status(500).send({
                status: "failed",
                message: "Reservation POST method failed",
                error: error,
            });
        }
    });
}
exports.makeDeskReservations = makeDeskReservations;
function updateDeskReservation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const filter = {
                id: req.params.officeId,
                "deskList.deskId": req.params.deskId,
                "deskList.reservationData.reservationId": req.params.reservationId,
            };
            let reservations = [];
            let reservation = [];
            const desk = yield officeModel_1.OfficeModel.findOne(filter);
            if (!desk) {
                throw new Error("No office with given ID");
            }
            else {
                const reservations = (_a = desk.deskList.find((o) => o.deskId === req.params.deskId)) === null || _a === void 0 ? void 0 : _a.reservationData;
                if (!reservations) {
                    throw new Error("No desk with given ID in this office");
                }
                else {
                    const reservation = reservations.find((o) => o.reservationId === req.params.reservationId);
                    if (reservation) {
                        reservation.startTime = req.body.startTime;
                        reservation.endTime = req.body.endTime;
                        yield desk.save();
                    }
                }
            }
            res.status(200).send({ status: "success", data: reservation });
        }
        catch (error) {
            console.error("Reservations PATCH method error:", error);
            res.status(500).send({
                status: "failed",
                message: "Reservations PATCH method failed",
                error: error,
            });
        }
    });
}
exports.updateDeskReservation = updateDeskReservation;
function deleteDeskReservation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const filter = {
                id: req.params.officeId,
                "deskList.deskId": req.params.deskId,
                "deskList.reservationData.reservationId": req.params.reservationId,
            };
            let reservations = [];
            let reservation = [];
            const desk = yield officeModel_1.OfficeModel.findOne(filter);
            if (!desk) {
                throw new Error("No office with given ID");
            }
            else {
                const reservations = (_a = desk.deskList.find((o) => o.deskId === req.params.deskId)) === null || _a === void 0 ? void 0 : _a.reservationData;
                if (!reservations) {
                    throw new Error("No desk with given ID in this office");
                }
                else {
                    const reservation = reservations.find((o) => o.reservationId === req.params.reservationId);
                    if (reservation) {
                        const index = reservations.indexOf(reservation);
                        reservations.splice(index, 1);
                        yield desk.save();
                    }
                }
            }
            res.status(200).send({ status: "success", data: reservations });
        }
        catch (error) {
            console.error("Reservations PATCH method error:", error);
            res.status(500).send({
                status: "failed",
                message: "Reservations PATCH method failed",
                error: error,
            });
        }
    });
}
exports.deleteDeskReservation = deleteDeskReservation;
