import express from 'express';
import { User } from '../../db/models/users.js';

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const data = await User.findAll({});
    res.send(data);
  } catch (error) {
    console.log(`UserRouter Get Error ${error}`);
  }
});
