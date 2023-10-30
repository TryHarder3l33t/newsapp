/**
 * default single export from a module that is not named
 * express.js file
 * export default function createApp() {... }
 * anotherFile.js
 * import express from 'express'
 * seed is a named function that is why it is in curly brackets
 * If you go to localhost:8080/ the server responds with at res.json({message: ' Welcome...'})
 **/

import express from 'express';
import { seed } from '../db/seed.js';
import { apiRouter } from './api/api.index.js';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

export const app = express();

const PORT = process.env.PORT || 8080;
const corsConfig = {
  origin: process.env.CORSORIGIN || 'http://localhost:3000',
};
const limiter = rateLimit({
  windowMs: 1000, // 15 * 60 * 1000-> 15 minutes
  limit: 3,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use(limiter);
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome into my dreams this is my fantasy - The Whispers ',
  });
  console.log('APP>GET');
});

app.listen(PORT, () => {
  console.log(`  You are listening on port http://localhost:${PORT}  `);
});

seed();
