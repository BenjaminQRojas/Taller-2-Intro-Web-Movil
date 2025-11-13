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
    types: {
    type: DataTypes.ARRAY(DataTypes.STRING), // arreglo de strings
  },
  abilities: {
    type: DataTypes.ARRAY(DataTypes.STRING), // arreglo de strings
  },
  height: {
    type: DataTypes.INTEGER, 
  },
});


export default Pokemon;
