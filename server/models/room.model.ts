import mongoose, { Model } from "mongoose";
import { IRoom } from "../types/mongoose";

interface IRoomMethods {}

type RoomModel = Model<IRoom, {}, IRoomMethods>;

const roomSchema = new mongoose.Schema<IRoom, RoomModel, IRoomMethods>(
  {
    roomName: { type: String },
    creator: { type: String },
    familyMembers: [{ type: String }],
    maxMembers: { type: Number, default: 10 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { versionKey: false }
);

roomSchema.pre("save", function (next) {
  try {
    next();
  } catch (error: any) {
    next(error);
  }
});

const Room = mongoose.model<IRoom, RoomModel>("Room", roomSchema);

export default Room;
