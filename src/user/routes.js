import express from "express";
import {
  createNewUser,
  loginUser,
  logoutUser,
  getAllUsers,
} from "../user/controllers.js";
import checkToken  from '../services/auth.js';


const userRouter = express.Router();

userRouter.post("/sign-up", createNewUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/users", checkToken,getAllUsers);
export default userRouter;
