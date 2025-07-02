import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  return res.status(200).send("Hello, Rahul");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
