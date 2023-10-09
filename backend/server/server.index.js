import express from 'express';
import { seed } from '../db/seed.js';

export const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({ message: 'Welcome into my dreams this is my fantasy' });
});
app.listen(PORT, () => {
  console.log(`  You are listening on port http://localhost:${PORT}  `);
});
seed();
