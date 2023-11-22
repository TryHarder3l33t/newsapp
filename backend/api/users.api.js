import express from 'express';
import { User } from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dbconfig as config } from '../db/config.db.js';
import multer from 'multer';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const upload = multer();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: '',
  pass: '',
});

export const usersRouter = express.Router();

const secretKey = config.SECRET_KEY;

// Forgot password
usersRouter.post('/forgotpassword', upload.none(), async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
    attributes: ['email', 'firstName'],
  });

  if (user) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    let resetTimeOut = new Date();
    resetTimeOut = resetTimeOut.setMinutes(resetTimeOut.getMinutes() + 15);
    // Reset Info in the DB
    const updateUser = await User.update(
      {
        resetToken: resetToken,
        resetTimeOut: resetTimeOut,
      },
      { where: { email: email } }
    );
    // Send Reset Email
    const resetLink = `http://localhost:3000/password-reset/?token=${resetToken}&email=${email}`;
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Please click the following link to reset your password: ${resetLink}`,
    };

    console.log(resetTimeOut);
  } else {
    // No user send empty data field
    res.send(user);
  }
});

// Login Token
usersRouter.get('/loginToken', async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ message: 'Unathorized' });
  }
  const token = authorizationHeader.split(' ')[[1]];
  const decoded = jwt.verify(token, secretKey);

  const userId = decoded.userId;

  const user = await User.findByPk(userId, {
    attributes: ['firstName', 'lastName', 'postId', 'anonId'],
  });

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
usersRouter.post('/signup', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
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
});

// Read All
usersRouter.get('/', async (req, res) => {
  try {
    const data = await User.findAll({});
    res.json(data);
  } catch (error) {
    console.log(`UserRouter Get Error ${error}`);
  }
});

// Read One
usersRouter.get('/:userId', async (req, res) => {
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
usersRouter.put('/', async (req, res) => {
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
