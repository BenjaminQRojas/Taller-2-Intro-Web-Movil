import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Pokemon = sequelize.define('Pokemon', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});

export default Pokemon;
