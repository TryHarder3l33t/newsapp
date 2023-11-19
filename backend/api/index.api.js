import express from 'express';
import { usersRouter } from './users.api.js';
import { postsRouter } from './posts.api.js';

export const apiRouter = express.Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);
