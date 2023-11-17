import express from 'express';
import { User } from '../../db/models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dbconfig as config } from '../../db/db.config.js';

export const userRouter = express.Router();

const secretKey = config.SECRET_KEY;

// Login Token
userRouter.get('/loginToken', async (req, res) => {
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

// create signup
userRouter.post('/signup', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ userId: user.id }, secretKey);
    console.log(`users.js 24: ${JSON.stringify(user)}`);

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
});

// Read All
userRouter.get('/', async (req, res) => {
  try {
    const data = await User.findAll({});
    res.json(data);
  } catch (error) {
    console.log(`UserRouter Get Error ${error}`);
  }
});

// Read One
userRouter.get('/:userId', async (req, res) => {
  console.log(`userId ${req.params.userId}`);
  try {
    const data = await User.findByPk(req.params.userId);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(`FindOne error ${error}`);
  }
});

// Update
userRouter.put('/', async (req, res) => {
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
