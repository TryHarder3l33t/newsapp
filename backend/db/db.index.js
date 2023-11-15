import { Sequelize } from 'sequelize';
import { dbconfig as config } from './db.config.js';

/**
 * Sequelize is an ORM used to interact with postgresql
 */
export const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,

  {
    host: config.HOST,
    dialect: config.DIALECT,
    operatorAliases: config.OPERATORALIAS,

    POOL: {
      max: config.POOL.MAX,
      min: config.POOL.MAX,
      acquire: config.POOL.ACQUIRE,
      idle: config.POOL.IDLE,
    },
  }
);
