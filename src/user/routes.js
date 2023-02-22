import express from "express";
import { createNewUser, loginUser } from "../user/controllers.js";

const userRouter = express.Router();

userRouter.post("/sign-up", createNewUser);
userRouter.post("/login", loginUser);

export default userRouter;
