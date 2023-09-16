import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import authRouter from "./src/routes/authRoutes";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { expressErrorHandler } from "./src/middlewares/express/expressErrorHandler";
import { connectSocketServer } from "./socket";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import { NOT_FOUND } from "./src/utils/constants";
import { config } from "./src/config/config";
import AppError from "./src/utils/express/appErrorClass";

configDotenv();

const app = express();

const corsOptions = {
  origin: ["http://localhost:4173"],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"],
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// limit requests from same API to 500.
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "To much requests, try again in an hour!",
});

app.use(limiter);
// For secure http headers
app.use(helmet());

// For preventing js and html scripts to corrupt data in DB and server.
app.use(xss());

// For preventing NoSql query injection in input fields.
app.use(mongoSanitize());

// For preventing parameter pollution (same query key name).
app.use(hpp());
 
mongoose
  .connect(`${config.mongo.url}`)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use("/api/v1/user", authRouter);

connectSocketServer(app);

app.all("*", (req, _res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, NOT_FOUND)
  );
});

app.use(expressErrorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
