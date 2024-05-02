import express from "express";

import loginRouter from "./routes/loginRouter";
import officeRouter from "./routes/officeRouter";
import signUpRouter from "./routes/signUpRouter"
import cors from "cors";
import userRouter from "./routes/userRouter";
import reservationsRouter from "./routes/reservationsRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/office", officeRouter);
app.use("/api/v1/signup", signUpRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/reservations", reservationsRouter);

export default app;
