import { Sequelize } from 'sequelize';
import { dbconfig as db } from './db.config.js';

export const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.DIALECT,
  operatorAliases: false,

  POOL: {
    max: db.POOL.MAX,
    min: db.POOL.MAX,
    acquire: db.POOL.ACQUIRE,
    idle: db.POOL.IDLE,
  },
});
