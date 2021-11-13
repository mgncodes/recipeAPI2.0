const https = require("https");
const url = require('url');
const express = require('express');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const server = express();
server.use(express.json());

server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});

const recipeDB = require('./recipeDBConn');
const { addRecipe, getRecipe, editRecipe, deleteRecipe } = require('./recipes');
const { appendFile } = require("fs");
const { response } = require("express");
const { create } = require("domain");

server.get('/recipes', async (request, response) => {
    const recipes = await getRecipe();
    if (recipes.error) {
        response.status(500).json({
            message: error.message,
            recipes: recipes.data
        });
    } response.status(200).json({
        message: 'all recipes fetched successfully',
        recipes: recipes.data
    });
});
server.post('/add-recipe', async (request, response) => {
    if (!Object.keys(request.body).length) {
        response.status(400).json({ message: 'Request body empty' })
    } const { id, recipeName, recipeType, makingTime } = (request.body);
    const recipe = await addRecipe({ recipeName, recipeType, makingTime });
    if (recipe.error) {
        response.status(500).json({ message: recipe.error })
    } response.status(201).json({ message: 'new recipe added' });
});
server.put('/edit-recipe/:id', async (request, response) => {
    if (!Object.keys(request.body).length) {
        response.status(400).json({
            message: 'Request body empty',
            recipe: null
        });
    } const recipe = await editRecipe(request.params.id, request.body);
    if (recipe.error) {
        response.status(500).json({
            message: recipe.error,
            recipe: recipe.data
        });
    } response.status(200).json({
        message: 'recipe edited successfully',
        recipe: recipe.data
    });
});
server.delete('/delete-recipe/:id', async (request, response) => {
    const isDeleted = await deleteRecipe(request.params.id);
    if (isDeleted.error) {
        response.status(500).json({
            message: isDeleted.error,
        });
    }
    response.status(200).json({
        message: 'recipe Deleted Successfully'
    });
});
