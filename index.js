import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "./src/user/routes.js";

dotenv.config();
///CONNECT DATABASE
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connect to MongoDb");
});
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

///ROUTES
app.use("/", userRouter);
app.listen(8000, () => {
  console.log("Server is running...");
});
