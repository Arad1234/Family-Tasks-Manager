import mongoose from "mongoose";
import { IMission } from "../types/mongoose";

const missionSchema = new mongoose.Schema<IMission>(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { versionKey: false }
);

const Mission = mongoose.model("Mission", missionSchema);

export default Mission;
