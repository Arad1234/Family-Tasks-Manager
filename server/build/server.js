"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./src/middlewares/express/errorHandler");
const socket_1 = require("./socket");
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
(0, socket_1.connectSocketServer)(app);
const corsOptions = {
    origin: ["http://localhost:4173"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
mongoose_1.default
    .connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
app.use("/api/v1/user", authRoutes_1.default);
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
