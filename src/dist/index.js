"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./Config/db");
const mainApp_1 = require("./mainApp");
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
const server = app.listen(process.env.PORT || port, () => {
    (0, db_1.dbConfig)();
});
process.on("uncaughtException", (error) => {
    console.log("Server is shutting down because of uncaught exception");
    console.log("uncaughtException: ", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("Server is shutting down because of unhandled rejection");
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
