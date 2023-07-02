import mongoose from "mongoose";
import { MissionDocument } from "../types/mongoose";

const missionSchema = new mongoose.Schema<MissionDocument>({
  name: { type: String, required: true },
  description: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Mission = mongoose.model("Mission", missionSchema);

export default Mission;
