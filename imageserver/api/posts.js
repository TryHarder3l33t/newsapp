import express from 'express';
import multer from 'multer';

export const postsRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postsRouter.get('/', (req, res) => {
  res.json(`The Best Of My Years Will Go To You - Al Green`);
});

postsRouter.post('/', upload.single('data'), async (req, res) => {
  console.log('Hitttt');
  console.log(' <-req.body-> ', req.body);
  console.log(' <-req.file-> ', req.file);

  res.send('hello you');
});
