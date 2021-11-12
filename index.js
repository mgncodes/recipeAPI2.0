const https = require("https");
const url = require('url');
const express = require('express');
// const mongoClient = require('mongodb').MongoClient;

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



// const requestListener = function (request, response) {
//     if(request.method === 'GET') {
//         return handleGet(request, response);
//     } else if(request.method === 'POST') {
//         return handlePost(request, response);
//     } else if(request.method === 'PUT') {
//         return handlePut(request, response);
//     } else if(request.method === 'DELETE') {
//         return handleDelete(request, response);
//     }
// } // get recipes
// function handleGet(request, response) {
//     const { pathname } = url.parse(request.url)
//     if (pathname !== '/recipes') {
//         return handleError(response, 404)
//     } response.setHeader('Content-Type', 'application/json;charset=utf-8');
//     return response.end(JSON.stringify(Recipes.getRecipes()));
// }
// function handlePost(request, response) {
//     const size = parseInt(request.headers['content-length'], 10)
//     const buffer = Buffer.allocUnsafe(size)
//     var pos = 0
//     const { pathname } = url.parse(request.url)
//     if (pathname !== '/add-recipe') {
//         return handleError(res, 404)
//     } 
//     request 
//     .on('data', (chunk) => { 
//         const offset = pos + chunk.length 
//         if (offset > size) { 
//             reject(413, 'Too Large', response) 
//             return 
//         } chunk.copy(buffer, pos) 
//         pos = offset 
//     }) 
//     .on('end', () => { 
//         if (pos !== size) { 
//             reject(400, 'Bad Request', response) 
//             return 
//         } const data = JSON.parse(buffer.toString())
//         Recipes.addRecipe(data);
//         console.log('User Posted: ', data) 
//         response.setHeader('Content-Type', 'application/json;charset=utf-8');
//         response.end('You Posted: ' + JSON.stringify(data))
//     })
// }
// function handlePut(request, response) {
//     const { pathname, query } = url.parse(request.url)
//     if (pathname !== '/edit-recipe') {
//         return handleError(response, 404)
//     } const { id } = qs.parse(query)
//     const size = parseInt(request.headers['content-length'], 10)
//     const buffer = Buffer.allocUnsafe(size)
//     var pos = 0
//     request 
//     .on('data', (chunk) => { 
//         const offset = pos + chunk.length 
//         if (offset > size) { 
//             reject(413, 'Too Large', response) 
//             return 
//         } chunk.copy(buffer, pos) 
//         pos = offset 
//     }) 
//     .on('end', () => { 
//         if (pos !== size) { 
//             reject(400, 'Bad request', response) 
//             return 
//         } const data = JSON.parse(buffer.toString())
//         const recipeUpdated = Recipes.editRecipe(id, data);
//         response.setHeader('Content-Type', 'application/json;charset=utf-8');
//         response.end(`{"recipeUpdated": ${recipeUpdated}}`)
//     })
// }
// function handleDelete(request, response) {
//     const { pathname, query } = url.parse(request.url)
//     if (pathname !== '/delete-recipe') {
//         return handleError(response, 404)
//     } const { id } = qs.parse(query)
//     const recipeDeleted = Recipes.deleteRecipe(id);
//     response.setHeader('Content-Type', 'application/json;charset=utf-8');
//     response.end(`{"recipeDeleted": ${recipeDeleted}}`)
// }
// function handleError (response, code) { 
//     response.statusCode = code
//     response.end(`{"error": "${http.STATUS_CODES[code]}"}`) 
// }


