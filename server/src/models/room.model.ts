import { Model, Schema, model } from "mongoose";
import { IRoom } from "../types/mongoose";
import bcrypt from "bcrypt";

interface IRoomMethods {
  validatePassword: (roomPassword: string) => Promise<boolean>;
}

type RoomModel = Model<IRoom, {}, IRoomMethods>;

// Single room schema
const roomSchema = new Schema<IRoom, RoomModel, IRoomMethods>(
  {
    roomName: String,
    creator: { userId: Schema.Types.ObjectId, username: String },
    familyMembers: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    maxMembers: Number,
    roomPassword: { type: String, select: false },
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.roomPassword;
        return ret;
      },
    },
  }
);

// Middlewares
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

// Methods
roomSchema.methods.validatePassword = async function (roomPasword: string) {
  const isPasswordValid = await bcrypt.compare(roomPasword, this.roomPassword);
  return isPasswordValid;
};

const Room = model<IRoom, RoomModel>("Room", roomSchema);

export default Room;
