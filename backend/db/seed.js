import { sequelize } from './db.index.js';
import { User } from './models/users.js';

export const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    const eric = await User.create({
      name: 'Eric D Rodgers',
    });
    console.log('success');
  } catch (error) {
    console.log('error on seed.js page');
    console.error(error);
  }
};
