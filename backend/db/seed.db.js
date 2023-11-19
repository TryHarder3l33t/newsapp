import { sequelize } from './index.db.js';
import { User } from '../models/users.model.js';

export const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    const eric = await User.create({
      firstName: 'Eric M Rodgers',
      lastName: 'Rodgers',
      email: 'eric.m.rodgers@gmail.com',
      password: 'password123',
    });
    const alicia = await User.create({
      firstName: 'Alicia',
      lastName: 'Rodgers',
      email: 'alicia.m.rodgers@gmail.com',
      password: 'password123',
    });
    const dariusz = await User.create({
      firstName: 'Dariusz',
      lastName: 'Thomas',
      email: 'dariusz.i.thomas@gmail.com',
      password: 'password123',
    });
    const mommy = await User.create({
      firstName: 'Tinamarie',
      lastName: 'Giraud',
      email: 'tinamarie@gmail.com',
      password: 'password123',
    });
    const daddy = await User.create({
      firstName: 'Eric',
      lastName: 'Rodgers',
      email: 'eric@gmail.com',
      password: 'password123',
    });
    console.log('success');
  } catch (error) {
    console.log('error on seed.js page');

    console.error(error);
  }
};
