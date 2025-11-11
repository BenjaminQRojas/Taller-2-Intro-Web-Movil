const express = require('express');
const { getAllMeals, getMeal } = require('./meal.controller.js');
const router = express.Router();

router.get('/', getAllMeals); 

router.get('/:id', getMeal); 

module.exports = router;