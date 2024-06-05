"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUser = exports.login = exports.getAllUsers = void 0;
const user_1 = __importStar(require("../models/user"));
const helpers_1 = require("../models/helpers");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.json(users);
    }
    catch (err) {
        console.log("Error💥: ", err);
        res.status(500).json({ error: "getAllUsers error" });
    }
});
exports.getAllUsers = getAllUsers;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mail, password } = req.body;
        if (!mail || !password) {
            return res.status(400).json({
                status: "failed",
                message: "Email and password are required.",
            });
        }
        const user = yield user_1.default
            .findOne({ mail })
            .select("+authentication.password +authentication.salt +authentication.sessionToken");
        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "Check your email address and password or create an account.",
            });
        }
        if (!user.authentication) {
            return res.status(400).json({
                status: "failed",
                message: "User authentication details not found.",
            });
        }
        const salt = user.authentication.salt;
        if (!salt) {
            return res
                .status(400)
                .json({ status: "failed", message: "Salt not found for user." });
        }
        const expectedHash = (0, helpers_1.authentication)(salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({
                status: "failed",
                message: "Check your email address and password or create an account.",
            });
        }
        // Assuming authentication function generates a new session token
        const sessionToken = (0, helpers_1.authentication)((0, helpers_1.random)(), user._id.toString());
        user.authentication.sessionToken = sessionToken;
        yield user.save();
        res.cookie("MICHAL-AUTH", sessionToken, { domain: "localhost", path: "/" });
        return res.status(200).json({ status: "success", data: { user } }).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionToken = req.body.token;
    try {
        const user = yield (0, user_1.getUserBySessionToken)(sessionToken);
        if (!user) {
            return res
                .status(404)
                .json({ status: "failed", message: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
exports.getUser = getUser;
