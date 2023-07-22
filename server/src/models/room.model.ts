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
    familyMembers: [
      {
        _id: false,
        username: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      },
    ],
    maxMembers: { type: Number, default: 10 },
    roomPassword: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { versionKey: false }
);

roomSchema.pre("save", async function (next) {
  const room = this;

  if (room.isModified("roomPassword")) {
    try {
      const hashedPassword = await bcrypt.hash(room.roomPassword, 10);
      this.roomPassword = hashedPassword;
      next();
    } catch (error: any) {
      next(error);
    }
  } else {
    next();
  }
});

roomSchema.methods.validatePassword = async function (roomPasword: string) {
  const isPasswordValid = await bcrypt.compare(roomPasword, this.roomPassword);
  return isPasswordValid;
};

roomSchema.methods.removePasswordProp = function () {
  const doc = this.toObject();
  delete doc.roomPassword;
  return doc;
};

const Room = mongoose.model<IRoom, RoomModel>("Room", roomSchema);

export default Room;
