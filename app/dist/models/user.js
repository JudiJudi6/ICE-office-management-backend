"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    offices: [{ type: String }],
    authentication: {
        password: { type: String, required: true, select: false },
        repeatPassword: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});
const userModel = mongoose_1.default.model('User', userSchema);
exports.default = userModel;
const getUsers = () => userModel.find();
exports.getUsers = getUsers;
const getUserByEmail = (mail) => userModel.findOne({ mail });
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sesionToken) => userModel.findOne({
    'authentication.sessionToken': sesionToken,
});
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = (id) => userModel.findById(id);
exports.getUserById = getUserById;
const createUser = (values) => new userModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserById = (id) => userModel.findOneAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => userModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
