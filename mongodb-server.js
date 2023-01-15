import * as dotenv from "dotenv";
import express from "express";
import moviesRouter from "./src/routers/movies-router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(moviesRouter);

const start = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port " + process.env.PORT);
    });
  } catch (error) {
    console.dir(error);
  }
};

start();
