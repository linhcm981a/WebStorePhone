const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRouter = require("./src/user/routes/auth");
const userRouter = require("./src/user/routes/user");
dotenv.config();
///CONNECT DATABASE
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connect to MongoDb");
});
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

///ROUTES
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.listen(3000, () => {
  console.log("Server is running...");
});
