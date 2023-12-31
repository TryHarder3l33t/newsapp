import { DataTypes } from 'sequelize';
import { sequelize as db } from '../db/index.db.js';
/**
 * Sequelize along with the driver pg talk to the database
 * User is a table in the database. You define it here
 *
 * Models are table definitions
 */

export const Post = db.define('post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
