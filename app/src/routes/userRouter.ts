import express from "express"
import { getUserOffices } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/:userId").get(getUserOffices)

export default userRouter;