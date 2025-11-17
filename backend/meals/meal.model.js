const { DataTypes } = require('sequelize');
const sequelize = require('./database.js');

const Meal = sequelize.define('Meal', {
    idMeal: {
        type: DataTypes.STRING, 
        primaryKey: true,
        allowNull: false
    },
    strMeal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    strCategory: {
        type: DataTypes.STRING
    },
    strArea: {
        type: DataTypes.STRING
    },
    strMealThumb: {
        type: DataTypes.STRING,
        allowNull: true
    },
    strInstructions: {
        type: DataTypes.TEXT
    },
    // 20 ingredientes y medidas
    strIngredient1: { type: DataTypes.STRING },
    strMeasure1: { type: DataTypes.STRING },
    strIngredient2: { type: DataTypes.STRING },
    strMeasure2: { type: DataTypes.STRING },
    strIngredient3: { type: DataTypes.STRING },
    strMeasure3: { type: DataTypes.STRING },
    strIngredient4: { type: DataTypes.STRING },
    strMeasure4: { type: DataTypes.STRING },
    strIngredient5: { type: DataTypes.STRING },
    strMeasure5: { type: DataTypes.STRING },
    strIngredient6: { type: DataTypes.STRING },
    strMeasure6: { type: DataTypes.STRING },
    strIngredient7: { type: DataTypes.STRING },
    strMeasure7: { type: DataTypes.STRING },
    strIngredient8: { type: DataTypes.STRING },
    strMeasure8: { type: DataTypes.STRING },
    strIngredient9: { type: DataTypes.STRING },
    strMeasure9: { type: DataTypes.STRING },
    strIngredient10: { type: DataTypes.STRING },
    strMeasure10: { type: DataTypes.STRING },
    strIngredient11: { type: DataTypes.STRING },
    strMeasure11: { type: DataTypes.STRING },
    strIngredient12: { type: DataTypes.STRING },
    strMeasure12: { type: DataTypes.STRING },
    strIngredient13: { type: DataTypes.STRING },
    strMeasure13: { type: DataTypes.STRING },
    strIngredient14: { type: DataTypes.STRING },
    strMeasure14: { type: DataTypes.STRING },
    strIngredient15: { type: DataTypes.STRING },
    strMeasure15: { type: DataTypes.STRING },
    strIngredient16: { type: DataTypes.STRING },
    strMeasure16: { type: DataTypes.STRING },
    strIngredient17: { type: DataTypes.STRING },
    strMeasure17: { type: DataTypes.STRING },
    strIngredient18: { type: DataTypes.STRING },
    strMeasure18: { type: DataTypes.STRING },
    strIngredient19: { type: DataTypes.STRING },
    strMeasure19: { type: DataTypes.STRING },
    strIngredient20: { type: DataTypes.STRING },
    strMeasure20: { type: DataTypes.STRING }
}, {
    tableName: 'meals', // nombre de la tabla
    timestamps: true    
});

module.exports = Meal;