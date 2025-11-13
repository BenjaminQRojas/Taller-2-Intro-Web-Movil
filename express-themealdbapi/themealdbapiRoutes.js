const express = require('express');
const { getAllMeals, getMeal, getRandomMeal } = require('./meal.controller.js');
const router = express.Router();

router.get('/', getAllMeals); 

router.get('/random', getRandomMeal);

router.get('/:id', getMeal); 



module.exports = router;