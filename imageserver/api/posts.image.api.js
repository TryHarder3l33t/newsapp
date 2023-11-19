import express from 'express';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import crypto from 'crypto';
import sharp from 'sharp';
import jwt from 'jsonwebtoken';

dotenv.config();

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

export const postsImageRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

postsImageRouter.get('/', (req, res) => {
  res.json(`The Best Of My Years Will Go To You - Al Green`);
});

postsImageRouter.post('/', upload.single('data'), async (req, res) => {
  // console.log('Hitttt');
  // console.log(' <-req.body-> ', req.body);
  // console.log(' <-req.file-> ', req.file);
  req.file.buffer;

  const sharpImage = await sharp(req.file.buffer)
    .resize({ height: 1080, width: 1080, fit: 'contain' })
    .jpeg({ mozjpeg: true })
    .toBuffer();
  const imageName = randomImageName();
  const imageNameEncoded = jwt.sign(
    { imageEncodedName: imageName },
    process.env.JWT_SECRET
  );
  const params = {
    Bucket: bucketName,
    // Image Name
    Key: imageName,
    //Body: req.file.buffer,
    Body: sharpImage,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);
  const response = await s3.send(command);
  console.log('Success image Upload');

  res.json({ response, imageNameEncoded });
});
