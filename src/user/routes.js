import express from "express";
import { createNewUser, loginUser, logoutUser} from "../user/controllers.js";

const userRouter = express.Router();

userRouter.post("/sign-up", createNewUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
export default userRouter;
