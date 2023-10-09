import { DataTypes } from 'sequelize';
import { sequelize as db } from '../db.index.js';

export const User = db.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});
