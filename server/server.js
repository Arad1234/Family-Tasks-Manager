import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import authRouter from "./routes/authRoutes.js";
import mongoose from "mongoose";
configDotenv();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://aradgoller:${process.env.DB_PASSWORD}@e-commerce-cluster.ifzjq4d.mongodb.net/`
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.use("/api/v1/user", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
