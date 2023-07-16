import mongoose from "mongoose";
import { RoomDocument } from "../types/mongoose";
import { createRoomSchema } from "../schema/room.schema";

const roomSchema = new mongoose.Schema<RoomDocument>({
  roomName: { type: String },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  familyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  maxMembers: { type: Number, default: 10 },
});

roomSchema.pre("save", function (next) {
  try {
    next();
  } catch (error: any) {
    next(error);
  }
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
