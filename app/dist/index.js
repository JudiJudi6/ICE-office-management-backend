"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("./app"));
const result_config = dotenv_1.default.config({ path: path_1.default.resolve(__dirname, './config.env') });
if (result_config.error) {
    console.error("ERROR💥:", result_config.error.message);
    process.exit(1);
}
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose_1.default.connect(DB).then(() => {
    console.log('DB connection successful❤️');
}).catch((err) => {
    console.error('Failed to connect with DataBase 💥');
    console.error(err);
    process.exit(1);
});
const port = process.env.PORT; // Pobiera port zmienną z process.env
if (!port) {
    console.error("ERROR💥: PORT is not defined in the .env file.");
    process.exit(1);
}
app_1.default.listen(port, () => {
    console.log(`App running on port ${port}...😁`);
});
