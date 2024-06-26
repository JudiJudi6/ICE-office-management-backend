import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import app from "./app";

const result_config = dotenv.config({
  path: path.resolve(__dirname, "./config.env"),
});

if (result_config.error) {
  console.error("ERROR💥:", result_config.error.message);
  process.exit(1);
}

const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful❤️");
  })
  .catch((err: any) => {
    console.error("Failed to connect with DataBase 💥");
    console.error(err);
    process.exit(1);
  });

const port = process.env.PORT; // Pobiera port zmienną z process.env

if (!port) {
  console.error("ERROR💥: PORT is not defined in the .env file.");
  process.exit(1);
}

app.listen(port, () => {
  console.log(`App running on port ${port}...😁`);
});
