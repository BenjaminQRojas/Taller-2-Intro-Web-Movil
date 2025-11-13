const express = require('express');
const cors = require('cors');
const path = require('path');
const frontendRoot = path.join(__dirname, '..');
const sequelize = require('./database.js');
const mealRoutes = require('./themealdbapiRoutes.js');
const Meal = require('./meal.model.js');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/meals', mealRoutes);

app.use(express.static(frontendRoot));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

sequelize.sync({ alter: true })
  .then(() => console.log('sinconizacion de la db exitosa'))
  .catch(err => console.error('error al sincronizar la db', err));

module.exports = app;