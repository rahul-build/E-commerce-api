import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  return res.status(200).send("Hello, Rahul");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
