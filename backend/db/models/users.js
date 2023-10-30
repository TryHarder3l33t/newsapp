import { DataTypes } from 'sequelize';
import { sequelize as db } from '../db.index.js';
/**
 * Sequelize along with the driver pg talk to the database
 * User is a table in the database. You define it here
 * Models are actually table definitions
 */

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
