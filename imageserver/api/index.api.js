import express from 'express';
import { postsImageRouter } from './posts.image.api.js';

export const apiRouter = express.Router();

apiRouter.use('/postsimage', postsImageRouter);
