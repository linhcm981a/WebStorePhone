import express from 'express';
import  createNewUser  from '../user/controllers.js';

const userRouter = express.Router();

userRouter.post('/user', createNewUser);

export default userRouter;