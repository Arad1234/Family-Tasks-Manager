import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = generateToken(user._id, user.email);
        res.status(200).json({ status: "ok", token: token });
      } else {
        res.status(401).json({ status: "Unauthorized" });
      }
    } else {
      res.status(401).json({ status: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({ status: "ok" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
