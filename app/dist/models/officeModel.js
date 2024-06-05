"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOfficeByInvCode = exports.OfficeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const deskRenderDataSchema = new mongoose_1.default.Schema({
    deskPath: { type: String, required: false },
    deskName: { type: String, required: false },
    equipPath: { type: String, required: false },
    equipment: [{ type: String }],
    id: { type: String, required: false },
    rotX: { type: Number, required: false },
    rotY: { type: Number, required: false },
    rotZ: { type: Number, required: false },
    scale: { type: Number, required: false },
    type: { type: String, enum: ["static", "desk"], required: false },
    x: { type: Number, required: false },
    y: { type: Number, required: false },
    z: { type: Number, required: false },
});
const floorRenderDataSchema = new mongoose_1.default.Schema({
    color: { type: String, required: false },
    endX: { type: Number, required: false },
    endY: { type: Number, required: false },
    endZ: { type: Number, required: false },
    id: { type: String, required: false },
    x: { type: Number, required: false },
    y: { type: Number, required: false },
    z: { type: Number, required: false },
});
const elementRenderDataSchema = new mongoose_1.default.Schema({
    id: { type: String, required: false },
    path: { type: String, required: false },
    rotX: { type: Number, required: false },
    rotY: { type: Number, required: false },
    rotZ: { type: Number, required: false },
    scale: { type: Number, required: false },
    type: { type: String, enum: ["static", "desk"], required: false },
    x: { type: Number, required: false },
    y: { type: Number, required: false },
    z: { type: Number, required: false },
});
const wallRenderDataSchema = new mongoose_1.default.Schema({
    color: { type: String, required: false },
    endX: { type: Number, required: false },
    endY: { type: Number, required: false },
    endZ: { type: Number, required: false },
    transparent: { type: Boolean, required: false },
    id: { type: String, required: false },
    x: { type: Number, required: false },
    y: { type: Number, required: false },
    z: { type: Number, required: false },
});
const officeSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    renderData: {
        desks: [{ type: deskRenderDataSchema, required: true }],
        floor: [{ type: floorRenderDataSchema, required: false }],
        elements: [{ type: elementRenderDataSchema, required: false }],
        walls: [{ type: wallRenderDataSchema, required: false }],
    },
    deskList: [
        {
            deskId: { type: String, required: true },
            deskName: { type: String, required: true },
            equipment: [{ type: String }],
            reservationData: [
                {
                    reservationId: { type: String, required: false },
                    userId: { type: String, required: false },
                    user: {
                        name: { type: String, required: false },
                        surname: { type: String, required: false },
                    },
                    startTime: { type: Date, required: false },
                    endTime: { type: Date, required: false },
                    createdAt: { type: Date, required: false },
                },
            ],
            active: { type: Boolean, default: true },
        },
    ],
    authorId: { type: String, required: true },
    users: [
        {
            name: { type: String, required: false },
            surname: { type: String, required: false },
        },
    ],
    invitationCode: { type: String, required: true },
});
exports.OfficeModel = mongoose_1.default.model("Office", officeSchema);
const getOfficeByInvCode = (code) => exports.OfficeModel.findOne({ invitationCode: code });
exports.getOfficeByInvCode = getOfficeByInvCode;
