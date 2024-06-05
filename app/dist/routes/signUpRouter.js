"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signUpController_1 = require("../controllers/signUpController");
const router = express_1.default.Router();
router.route("/").post(signUpController_1.register);
exports.default = router;
