import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('pokemondb', 'postgres', 'postgres', { //nombre de db en postgre, usuario, contraseña
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

export default sequelize;
