import express from "express";

import { pinModel } from "../models/Pins.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const newPin = new pinModel(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const pins = await pinModel.find();
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as pinRouter };
