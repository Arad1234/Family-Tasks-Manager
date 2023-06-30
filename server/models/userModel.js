import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 2 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
});

userSchema.pre("save", async function () {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);

export default User;
