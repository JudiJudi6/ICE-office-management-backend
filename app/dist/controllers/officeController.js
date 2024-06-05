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
exports.patchDeskAvailability = exports.getOfficeById = exports.joinOfficeByCode = exports.sendOffice = exports.getOffice = void 0;
const officeModel_1 = require("../models/officeModel");
const user_1 = require("../models/user");
function getOffice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const offices = yield officeModel_1.OfficeModel.find();
            res.status(200).json({ status: "success", data: { offices } });
        }
        catch (error) {
            console.error("Office GET method error:", error);
            res.status(500).send({
                status: "failed",
                message: "Office GET method failed",
                error: error,
            });
        }
    });
}
exports.getOffice = getOffice;
function sendOffice(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newOffice = new officeModel_1.OfficeModel(req.body);
            const author = yield (0, user_1.getUserById)(req.body.authorId);
            yield newOffice.save();
            if (author) {
                yield author.offices.push(req.body.id);
                yield author.save();
            }
            else {
                throw new Error("how tf did u make an office with no account lol");
            }
            res.status(200).send({ status: "success", data: newOffice });
        }
        catch (error) {
            console.error("Office POST method error:", error);
            res.status(500).send({
                status: "failed",
                message: "Office POST method failed",
                error: error,
            });
        }
    });
}
exports.sendOffice = sendOffice;
function joinOfficeByCode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const officeToJoin = yield (0, officeModel_1.getOfficeByInvCode)(req.params.invCode);
            const userToJoin = yield (0, user_1.getUserById)(req.body.userId);
            console.log(officeToJoin);
            if (userToJoin && officeToJoin && !userToJoin.offices.includes(officeToJoin.id)) {
                yield officeToJoin.users.push({
                    name: userToJoin.name,
                    surname: userToJoin.surname,
                });
                yield userToJoin.offices.push(officeToJoin.id);
                yield userToJoin.save();
                yield officeToJoin.save();
            }
            else {
                throw new Error("No office with given invitation code or user already joined given office");
            }
            res.status(200).send({ status: "success", data: userToJoin });
        }
        catch (error) {
            console.error("Office POST by code method error:", error);
            res.status(500).send({
                status: "failed",
                message: "Office POST by code method failed",
                error: error,
            });
        }
    });
}
exports.joinOfficeByCode = joinOfficeByCode;
function getOfficeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const office = yield officeModel_1.OfficeModel.findOne({ id: req.params.id });
            res.status(200).send({ status: "success", data: office });
        }
        catch (error) {
            console.error("Office GET by ID method error:", error);
            res.status(500).send({
                status: "failed",
                message: "Office GET by ID method failed",
                error: error,
            });
        }
    });
}
exports.getOfficeById = getOfficeById;
function patchDeskAvailability(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filter = { id: req.params.officeId, "deskList.deskId": req.params.deskId };
            const update = { $set: { "deskList.$.active": req.body.active } };
            const desk = yield officeModel_1.OfficeModel.findOneAndUpdate(filter, update, { new: true });
            console.log(desk);
            if (!desk) {
                throw new Error("No office with given ID");
            }
            res.status(200).send({ status: "success", data: desk });
        }
        catch (error) {
            console.error("Desks PATCH method error:", error);
            res.status(500).send({
                status: "failed",
                message: "Desks PATCH method failed",
                error: error,
            });
        }
    });
}
exports.patchDeskAvailability = patchDeskAvailability;
