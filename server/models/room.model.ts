import mongoose, { Model } from "mongoose";
import { IRoom } from "../types/mongoose";
import bcrypt from "bcrypt";

interface IRoomMethods {}

type RoomModel = Model<IRoom, {}, IRoomMethods>;

const roomSchema = new mongoose.Schema<IRoom, RoomModel, IRoomMethods>(
  {
    roomName: { type: String },
    creator: { type: String },
    familyMembers: [{ type: String }],
    maxMembers: { type: Number, default: 10 },
    roomPassword: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { versionKey: false }
);

roomSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.roomPassword, 10);
    this.roomPassword = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

const Room = mongoose.model<IRoom, RoomModel>("Room", roomSchema);

export default Room;
