import express from "express";
import {
  createNewUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getAUsers,
  updateUsers,
  deleteUsers
} from "../user/controllers.js";
import checkToken from "../services/auth.js";

const userRouter = express.Router();

userRouter.post("/sign-up", createNewUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/users", checkToken, getAllUsers);
userRouter.get("/users/:id", checkToken, getAUsers);
userRouter.patch("/users/:id", checkToken, updateUsers);
userRouter.delete("/users/:id", checkToken, deleteUsers);
export default userRouter;
