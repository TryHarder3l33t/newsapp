import { sequelize } from './db.index.js';
import { User } from './models/users.js';

export const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    const eric = await User.create({
      firstName: 'Eric M Rodgers',
      lastName: 'Rodgers',
      email: 'eric.m.rodgers@gmail.com',
    });
    const alicia = await User.create({
      firstName: 'Alicia',
      lastName: 'Rodgers',
      email: 'alicia.m.rodgers@gmail.com',
    });
    const dariusz = await User.create({
      firstName: 'Dariusz',
      lastName: 'Thomas',
      email: 'dariusz.i.thomas@gmail.com',
    });
    const mommy = await User.create({
      firstName: 'Tinamarie',
      lastName: 'Giraud',
      email: 'tinamarie@gmail.com',
    });
    const daddy = await User.create({
      firstName: 'Eric',
      lastName: 'Rodgers',
      email: 'eric@gmail.com',
    });
    console.log('success');
  } catch (error) {
    console.log('error on seed.js page');

    console.error(error);
  }
};
