/**
 * Sequelize can be used with mysql and other dbs so you specify postgres as a dialect
 * The node server uses PG to connect to the postgres server on
 * postgres://user:pass@localhost:5432/dbname'
 */

export const dbconfig = {
  SECRET_KEY: process.env.SECRET_KEY || 'password123',
  HOST: process.env.HOST || 'localhost',
  USER: process.env.USER || 'newspaperdbrole',
  PASSWORD: process.env.password || '123',
  DB: process.env.DB || 'newspaperdb',
  DIALECT: process.env.DIALECT || 'postgres',
  OPERATORALIAS: process.env.OPERATORALIAS || false,
  POOL: {
    MAX: 5,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000,
  },
};
