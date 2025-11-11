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
        validate: {
            isUrl: true
        }
    },
    strInstructions: {
        type: DataTypes.TEXT
    },
    
}, {
    tableName: 'meals', // nombre de la tabla
    timestamps: true    
});

module.exports = Meal;