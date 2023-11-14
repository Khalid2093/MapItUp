import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(404).json({ message: "User Already exists!" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, email, password: hashedPass });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered succcesfully", id: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User does not exist,register first!" });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      return res.status(404).json({ message: "Wrong Password" });
    }

    res.status(200).json({ message: "User logged in succcesfully", id: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userRouter };
