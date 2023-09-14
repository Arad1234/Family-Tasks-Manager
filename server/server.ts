import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import authRouter from "./src/routes/authRoutes";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middlewares/express/errorHandler";
import { connectSocketServer } from "./socket";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

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

// limit requests from same API
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
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use("/api/v1/user", authRouter);

app.use(errorHandler);

connectSocketServer(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
