const mongoose = require('mongoose');
const RecipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    recipeType: {
        type: String,
        required: true
    },
    makingTime: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);
module.exports = mongoose.model('Recipe', RecipeSchema);