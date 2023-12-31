import express from 'express';
import { User } from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { dbconfig as config } from '../db/config.db.js';
import multer from 'multer';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const upload = multer();

export const usersRouter = express.Router();

// Password Reset
usersRouter.put('/passwordreset', upload.none(), async (req, res) => {
  console.log('Hit');
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: ['resetToken', 'resetTimeOut'],
    });
    let now = new Date();
    now = now.setMinutes(now.getMinutes());

    if (user && token === user.resetToken && user.resetTimeOut > now) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedData = {
        password: hashedPassword,
      };
      try {
        const user = await User.update(updatedData, {
          where: { email: email },
        });
        if (user) {
          res.send(user);
        } else {
          res.send(null);
        }
      } catch (error) {
        res.send(null);
      }
    } else {
      res.send(null);
    }
  } catch (error) {
    res.send(error);
  }
});

// Forgot password
usersRouter.post('/forgotpassword', upload.none(), async (req, res) => {
  const { email } = req.body;

  // Validate whether the email exists in db
  const user = await User.findOne({
    where: {
      email: email,
    },
    attributes: ['email', 'firstName'],
  });

  // If user send an email with the url
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
    const resetLink = `${process.env.FRONTEND_URL}/password-reset/?token=${resetToken}&email=${email}`;
    const mailOptions = {
      from: `${process.env.RESET_SITE_EMAIL}`,
      to: email,
      subject: 'Its News Now Password Reset',
      text: `Please click the following link to reset your password: ${resetLink}`,
    };

    const transporter = nodemailer.createTransport({
      host: `${process.env.SPARK_POST_HOST}`,
      port: process.env.SPARK_POST_PORT,
      auth: {
        user: `${process.env.SPARK_POST_USERNAME}`,
        pass: `${process.env.SPARK_POST_API_KEY_PASSWORD}`,
      },
    });

    const sendPasswordResetEmail = async (email, resetToken) => {
      const resetLink = `${process.env.FRONTEND_URL}/password-reset/${resetToken}/${email}`;

      const mailOptions = {
        from: `${process.env.RESET_SITE_EMAIL}`,
        to: email,
        subject: 'Password Reset Request',
        text: `Please click the following link to reset your password ${resetLink}`,
      };

      const response = await transporter.sendMail(mailOptions);

      return response;
    };
    const passResponse = await sendPasswordResetEmail(email, resetToken);
    res.send(passResponse);
  } else {
    // No user send empty data field
    res.send(user);
  }
});

// Login With Token
usersRouter.get('/loginToken', async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({ message: 'Unathorized' });
  }
  const token = authorizationHeader.split(' ')[[1]];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const userId = decoded.userId;
  console.log(userId);

  const user = await User.findByPk(userId, {
    attributes: ['firstName', 'lastName', 'postId', 'anonId'],
  });
  console.log(user);

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
    console.log('UserId', user.id);
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
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
    console.log('---------- this is the data -------');
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(`UserRouter Get Error ${error}`);
  }
});

// Read One
usersRouter.get('/:userId', async (req, res) => {
  try {
    const data = await User.findByPk(req.params.userId);
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
    res.json(updated);
  } catch (error) {}
});
