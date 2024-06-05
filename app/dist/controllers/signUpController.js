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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const user_2 = require("../models/user");
const helpers_1 = require("../models/helpers");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mail, password, repeatPassword, name, surname } = req.body;
        //console.log('1)Email:', email)
        if (!mail || !password || !repeatPassword || !name || !surname) {
            res.status(400).send({
                status: "failed",
                message: "All fields are required"
            });
            return; // Dodaj return, aby przerwać dalsze wykonywanie kodu w przypadku braku wymaganych pól
        }
        //console.log('2)Email:', email)
        if (password !== repeatPassword) {
            res.status(403).send({
                status: "failed",
                message: "Passwords do not match"
            });
            return; // Dodaj return, aby przerwać dalsze wykonywanie kodu w przypadku niezgodności haseł
        }
        //console.log('3)Email:', email)
        const existingUser = yield (0, user_2.getUserByEmail)(mail);
        if (existingUser) {
            res.status(400).send({
                status: "failed",
                message: "User with this email already exists"
            });
            return; // Dodaj return, aby przerwać dalsze wykonywanie kodu w przypadku istnienia użytkownika o podanym adresie e-mail
        }
        console.log('4)Email:', mail);
        const salt = (0, helpers_1.random)();
        const user = new user_1.default({
            mail: mail,
            name,
            surname,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
                repeatPassword: (0, helpers_1.authentication)(salt, repeatPassword),
            }
        });
        //console.log('5)Email:', email)
        console.log('User:', user);
        yield user.save(); // Dodaj await przed user.save(), aby upewnić się, że operacja zapisu zostanie zakończona przed kontynuacją
        //console.log('6)Email:', email)
        res.status(200).send({ status: "success", data: user });
        //console.log('7)Email:', email)
    }
    catch (err) {
        console.log('Error💥: ', err);
        res.status(500).json({ error: "An error occurred while processing your request" });
    }
});
exports.register = register;
