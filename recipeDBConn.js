const mongoose = require('mongoose');
const dburi = 'mongodb://localhost:27017/recipeDB';
mongoose.connect(dburi);

const db = mongoose.connection;
db.on("error", (err) => { console.error(`error: ${err}`)});
db.on("connected", (err, res) => { console.log('Connected to database')});

// // to display recipes
// function getRecipes() {
//     return recipes;
// } // to add new recipe
// function addRecipe(recipe) {
//     const recipeCnt = recipes.length
//     recipe['id'] = recipeCnt + 1
//     recipes.push(recipe);
// } // to delete existing recipe
// // filter out all recipes which dont have the id
// function deleteRecipe(id) {
//     const recipeCnt = recipes.length
//     recipes = recipes.filter(recipe => recipe.id != id); 
//     return recipes.length !== recipeCnt 
// } // edit existing recipe
// function editRecipe(id, recipe) {
//     const recipeFound = recipes.filter(rec => rec.id == id);
//     if(recipeFound.length === 0) return false // recipe not found
//     // change data of the recipes with given id, to given recipe
//     recipes = recipes.map(rec => {
//         if(id == rec.id) {
//             rec = {id: rec.id, ...recipe};
//         } return rec
//     })
//     return true;
// }
// const Recipes = function() {}

// Recipes.prototype.getRecipes = getRecipes
// Recipes.prototype.addRecipe = addRecipe
// Recipes.prototype.editRecipe = editRecipe
// Recipes.prototype.deleteRecipe = deleteRecipe

// module.exports = new Recipes();