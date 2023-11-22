import express from 'express';
import { Post } from '../models/posts.model.js';
import { User } from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dbconfig as config } from '../db/config.db.js';
import dotenv from 'dotenv';

dotenv.config();

export const postsRouter = express.Router();

const secretKey = process.env.SECRET_KEY;

// Login Token
/**
 * 
 * userRouter.get('/loginToken', async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ message: 'Unathorized' });
  }
  const token = authorizationHeader.split(' ')[[1]];
  const decoded = jwt.verify(token, secretKey);

  const userId = decoded.userId;

  const user = await User.findByPk(userId);

  if (!user || !token) {
    res.status(401).json({ message: 'Invalid Token' });
  } else {
    console.log(`     UsersBE 14 `);

    res.json({
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      postId: user.postId,
      anonId: user.anonId,
    });
  }
});
 */

// create signup YOU ARE HERE
postsRouter.post('/', async (req, res) => {
  console.log(req.body);
  console.log(secretKey);
  let decodedImage;
  try {
    decodedImage = jwt.verify(req.body.imageEncodedName, secretKey);
    console.log(decodedImage);
  } catch (error) {
    res.send(null);
  }
  decodedImage = decodedImage.imageEncodedName;

  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).json({ message: 'Unathorized' });
  }

  const token = authorizationHeader.split(' ')[[1]];

  let decoded;

  try {
    decoded = jwt.verify(token, secretKey);
  } catch (error) {
    res.send(null);
  }

  const userId = decoded.userId;

  const user = await User.findByPk(userId, {
    attributes: ['postId', 'firstName', 'lastName'],
  });
  const postPayload = {};
  postPayload.firstName = user.firstName;
  postPayload.lastName = user.lastName;
  postPayload.postId = user.postId;
  postPayload.title = req.body.title;
  postPayload.content = req.body.content;
  postPayload.imageURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${decodedImage}`;

  const post = await Post.create(postPayload);
  console.log(post);
  //console.log(user);
  console.log(user.id);
  console.log(user.postId);
  res.json(post);

  //console.log(req.body);
  //const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //req.body.password = hashedPassword;

  /**
  const imageEncodedName = req.body.imageEncodedName;
  const decoded = jwt.verify(imageEncodedName, secretKey);
  const decodedName = decoded.imageEncodedName;

  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ userId: user.id }, secretKey);
    console.log(`     users.js 24: ${JSON.stringify(user)}`);

    res.status(201).json({
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      postId: user.postId,
      anonId: user.anonId,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message2: 'Username already exists' });
    } else {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
    **/
});

// Read All
/**
 * 
 * userRouter.get('/', async (req, res) => {
  try {
    const data = await User.findAll({});
    res.json(data);
  } catch (error) {
    console.log(`UserRouter Get Error ${error}`);
  }
});
 */

// Read One
/**
 * userRouter.get('/:userId', async (req, res) => {
  console.log(`userId ${req.params.userId}`);
  try {
    const data = await User.findByPk(req.params.userId);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(`FindOne error ${error}`);
  }
});
 */

// Update
/**
 * userRouter.put('/', async (req, res) => {
  try {
    const data = await User.findByPk(req.body.id);
    data.set({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    const updated = await data.save();
    console.log(updated);
    res.json(updated);
  } catch (error) {}
});
 */
