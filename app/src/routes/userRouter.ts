import express from "express"
import { getUserMadeOffices, getUserAllOffices } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/:userId").get(getUserMadeOffices)
userRouter.route("/:userId/all").get(getUserAllOffices)

export default userRouter;