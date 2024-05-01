import express from "express";
import { getUser, login } from "../controllers/loginController";

const router = express.Router();

router.route("/").post(login);
router.route("/getUser").post(getUser)

export default router;