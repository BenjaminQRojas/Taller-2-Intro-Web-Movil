const express = require('express');
const cors = require('cors');
const sequelize = require('./database.js');
const mealRoutes = require('./themealdbapiRoutes.js');
const Meal = require('./meal.model.js'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/meals', mealRoutes);

sequelize.sync({ alter: true })
  .then(() => console.log('sinconizacion de la db exitosa'))
  .catch(err => console.error('error al sincronizar la db', err));

module.exports = app;