import { sequelize } from './index.db.js';
import { User } from '../models/users.model.js';
import { Post } from '../models/posts.model.js';

export const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    const firstPost = await Post.create({
      postId: 123456,
      firstName: 'Elmo',
      lastName: 'Tickle',
      title: 'First Post',
      content: 'This is a story of a little Fart',
      imageURL:
        'https://simple.wikipedia.org/wiki/Smiley#/media/File:Smiley.svg',
    });
    const eric = await User.create({
      firstName: 'Eric M Rodgers',
      lastName: 'Rodgers',
      email: 'eric.m.rodgers@gmail.com',
      password: 'password123',
      reseToken: '',
      resetTimeOut: '',
    });
    const alicia = await User.create({
      firstName: 'Alicia',
      lastName: 'Rodgers',
      email: 'alicia.m.rodgers@gmail.com',
      password: 'password123',
      reseToken: '',
      resetTimeOut: '',
    });
    const dariusz = await User.create({
      firstName: 'Dariusz',
      lastName: 'Thomas',
      email: 'dariusz.i.thomas@gmail.com',
      password: 'password123',
      reseToken: '',
      resetTimeOut: '',
    });
    const mommy = await User.create({
      firstName: 'Tinamarie',
      lastName: 'Giraud',
      email: 'tinamarie@gmail.com',
      password: 'password123',
      reseToken: '',
      resetTimeOut: '',
    });
    const daddy = await User.create({
      firstName: 'Eric',
      lastName: 'Rodgers',
      email: 'eric.d.rodgers@gmail.com',
      password: 'password123',
      reseToken: '',
      resetTimeOut: '',
    });
    console.log('success');
  } catch (error) {
    console.log('error on seed.js page');

    console.error(error);
  }
};
