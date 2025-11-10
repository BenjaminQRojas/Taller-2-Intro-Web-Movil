import express from 'express';
import cors from 'cors';
import pokemonRoutes from './pokemonRoutes.js';
import sequelize from './database.js';
import Pokemon from './pokemon.model.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/pokemons', pokemonRoutes);

//conectar DB
sequelize.sync({ alter: true })
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error DB:', err));

export default app;
