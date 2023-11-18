import express from 'express';
import { postsRouter } from './posts.js';

export const apiRouter = express.Router();

apiRouter.use('/posts', postsRouter);
