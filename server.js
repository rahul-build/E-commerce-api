import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("Hello, Rahul");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
