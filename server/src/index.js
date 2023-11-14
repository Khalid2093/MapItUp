import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {pinRouter} from "./routes/pins.js";
import {userRouter} from "./routes/users.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error.message));

app.use("/pins", pinRouter);
app.use("/users", userRouter);

app.listen(3001, () => console.log("server started at port 3001"));
