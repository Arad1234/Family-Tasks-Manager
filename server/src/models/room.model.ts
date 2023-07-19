import mongoose, { Model } from "mongoose";
import { IRoom } from "../types/mongoose";
import bcrypt from "bcrypt";

interface IRoomMethods {
  removePasswordProp: () => Omit<IRoom, "roomPassword">;
  validatePassword: (roomPassword: string) => Promise<boolean>;
}

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
  console.log(this.roomPassword);
  try {
    const hashedPassword = await bcrypt.hash(this.roomPassword, 10);
    this.roomPassword = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

roomSchema.methods.validatePassword = async function (roomPasword: string) {
  const isPasswordValid = await bcrypt.compare(roomPasword, this.roomPassword);
  console.log(roomPasword, this.roomPassword);
  return isPasswordValid;
};

roomSchema.methods.removePasswordProp = function () {
  const doc = this.toObject();
  delete doc.roomPassword;
  return doc;
};

const Room = mongoose.model<IRoom, RoomModel>("Room", roomSchema);

export default Room;
