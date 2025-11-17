import express from 'express';
import cors from 'cors';
import pokemonRoutes from './pokemonRoutes.js';
import sequelize from './database.js';
import Pokemon from './pokemon.model.js';
import swaggerUI from 'swagger-ui-express';
import specs from "./swagger/swagger.js"


const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(specs))  

app.use('/api/pokemons', pokemonRoutes);

//conectar DB
sequelize.sync({ alter: true })
  .then(() => console.log('Base de datos sincronizada'))
  .then(() => console.log(`Documentación en http://localhost:${PORT}/api-docs`))
  .catch(err => console.error('Error DB:', err));

export default app;