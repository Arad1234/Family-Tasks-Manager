import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import authRouter from "./src/routes/authRoutes";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/middlewares/express/errorHandler";
import { connectSocketServer } from "./socket";

configDotenv();

const app = express();

connectSocketServer(app);

const corsOptions = {
  origin: ["http://192.168.1.84:5173", "http://localhost:5173"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use("/api/v1/user", authRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
