import express from 'express';
import { User } from '../../db/models/users.js';

export const userRouter = express.Router();

// create
userRouter.post('/', async (req, res) => {
  try {
    const data = await User.create(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
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
