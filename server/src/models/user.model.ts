import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/mongoose";
import crypto from "crypto";
import AppError from "../utils/appErrorClass";
import { INTERNAL_SERVER_ERROR } from "../utils/constants";

interface IUserMethods {
  createPasswordResetToken: () => string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

export const userSchema = new Schema<IUser, {}, IUserMethods>(
  {
    username: String,
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password") || !user.password) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(new AppError(error.message, INTERNAL_SERVER_ERROR));
  }
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the resetToken to the DB.
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes (in miliseconds)

  return resetToken;
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
