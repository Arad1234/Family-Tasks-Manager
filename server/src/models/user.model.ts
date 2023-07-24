import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/mongoose";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: String,
    email: { type: String, unique: true },
    password: String,
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error: any) {
      next(error);
    }
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

export default User;
