import { Model, Schema, Types, model } from "mongoose";
import { IRoom } from "../types/mongoose";
import bcrypt from "bcrypt";
import { taskSchema } from "./task.model";

interface IRoomMethods {
  removePasswordProp: () => Omit<IRoom, "roomPassword">;
  validatePassword: (roomPassword: string) => Promise<boolean>;
}

type RoomModel = Model<IRoom, {}, IRoomMethods>;

// Single room schema
const roomSchema = new Schema<IRoom, RoomModel, IRoomMethods>(
  {
    roomName: String,
    creator: { userId: Types.ObjectId, username: String },
    familyMembers: [
      {
        _id: false,
        userId: { type: Types.ObjectId, ref: "users" },
        username: String,
        tasks: [taskSchema],
      },
    ],
    maxMembers: Number,
    roomPassword: String,
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

const Room = model<IRoom, RoomModel>("Room", roomSchema);

export default Room;
