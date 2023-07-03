import mongoose from "mongoose";
import { RoomDocument } from "../types/mongoose";

const roomSchema = new mongoose.Schema<RoomDocument>({
  roomName: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  familyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  maxMembers: { type: Number, default: 10 },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
