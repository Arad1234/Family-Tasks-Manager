import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { verifyToken } from "./middlewares/verifyToken";
import authRouter from "./routes/authRoutes";
import roomsRouter from "./routes/roomsRoute";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
configDotenv();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(
    `mongodb+srv://aradgoller:${process.env.DB_PASSWORD}@e-commerce-cluster.ifzjq4d.mongodb.net/`
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use("/api/v1/user", authRouter);
app.use("/api/v1/data", verifyToken as any, roomsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
