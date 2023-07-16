import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument } from "../types/mongoose";

const userSchema = new mongoose.Schema<UserDocument>({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
