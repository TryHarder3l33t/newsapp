import { sequelize } from './index.db.js';
import { User } from '../models/users.model.js';
import { Post } from '../models/posts.model.js';

const posts = async (num) => {
  for (let post = 0; post < num; post++) {
    const newNum = post + 1;
    await Post.create({
      postId: newNum,
      firstName: `EricClone${newNum}`,
      lastName: `Doe${newNum}`,
      title: `Post Number ${newNum}`,
      content: 'Some content',
      imageURL:
        'https://newspaper-images-7477.s3.amazonaws.com/ad739f5a463a97476377fde54799ba9761eed62d46ceec9b94348e666af43428',
    });
  }
};

export const seed = async (num) => {
  try {
    await sequelize.sync({ force: true });
    posts(num);
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
