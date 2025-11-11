const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.PGDATABASE || 'themealdb', // Nombre de la DB
  process.env.PGUSER || 'postgres',         // Usuario
  process.env.PGPASSWORD || 'admin',     // Contraseña
  { 
    host: process.env.PGHOST || 'localhost',
    dialect: 'postgres',
    logging: false,
    port: process.env.PGPORT || 5432
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('conexion exitosa a la base de datos');
  } catch (error) {
    console.error('error al conectar con la base de datos:', error);
  }
}

connectDB();
module.exports = sequelize;