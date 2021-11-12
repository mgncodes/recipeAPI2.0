const mongoose = require('mongoose');
const recipeSchema = mongoose.Schema({
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
    }
});
// Export model
module.exports = mongoose.model('Recipes', recipeSchema);