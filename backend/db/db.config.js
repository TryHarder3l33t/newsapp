export const dbconfig = {
  HOST: 'localhost' || process.env.HOST,
  USER: 'newspaperdbrole' || process.env.USER,
  PASSWORD: '123' || process.env.password,
  DB: 'newspaperdb' || process.env.DB,
  DIALECT: 'postgres' || process.env.DIALECT,
  POOL: {
    MAX: 5,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000,
  },
};
