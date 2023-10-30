import express from 'express';
import { userRouter } from './users.js';

export const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
