import express, { json } from 'express';
import cors from 'cors';
import { apiRouter } from '../api/index.api.js';

export const app = express();
const corsConfig = {
  origin: process.env.CORS_CONFIG_IMAGE || 'http://localhost:3000',
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send(`I Cant Believe You Love Me   - Barry White`);
});

const PORT = process.env.IMAGE_SERVER_PORT || 8081;
app.listen(PORT, () => {
  console.log(`Image Servers Running On Port: ${PORT}`);
});
