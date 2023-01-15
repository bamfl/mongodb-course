import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import movieRouter from "./src/routers/movie-router.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(movieRouter);

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URL);

    app.listen(PORT, () => {
      console.log("Server is listening on port " + PORT);
    });
  } catch (error) {
    console.dir(error);
  }
};

start();
