import express from "express";

import loginRouter from "./routes/loginRouter";
import officeRouter from "./routes/officeRouter";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/login", loginRouter);
app.use("/api/v1/office", officeRouter);

export default app;
