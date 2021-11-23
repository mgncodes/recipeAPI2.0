const router = require('express').Router();
const Recipe = require('../models/recipe');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function validateToken(req) {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) return true;
    else return null;
}
//add recipe 
router.post('/add-recipe', async (req, res) => {
    try {
        if (validateToken(req)) {
            const saveRecipe = await new Recipe(req.body);
            const savedRecipe = await saveRecipe.save();
            res.status(200).send({ success: true, message: savedRecipe });
        } else {
            res.status(403).send({ success: false, message: 'unauthorised' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: error });
    }
});
//get All recipes 
router.get('/recipes', async (req, res) => {
    try {
        if (validateToken(req)) {
            const recipes = await Recipe.find();
            res.status(200).send({ success: true, message: recipes });
        } else {
            res.status(403).send({ success: false, message: "unauthorised." });
        }
    } catch (error) {
        res.status(500).send({success: false, message: error});
    }
});
//get one recipe of id 
router.get('/recipes/:id', async (req, res) => {
    try {
        if (validateToken(req)) {
            const recipe = await Recipe.findById(req.params.id);
            res.status(200).send({success: true, message: recipe});
        } else {
            res.status(403).send({ success: false, message: "unauthorised." });
        }
    } catch (error) {
        res.status(500).send({success: false, message: error});
    }
});
//update recipe
router.put('/edit-recipe/:id', async (req, res) => {
    try {
        if (validateToken(req)) {
            const recipe = await Recipe.findById(req.params.id);
            await Recipe.updateOne({ $set: req.body });
            res.status(200).send({success: true, message: 'recipe updated'});
        } else {
            res.status(403).send({ success: false, message: "unauthorised." });
        }
    } catch (error) {
        res.status(500).send({success: false, message: error});
    }
});
//delete post 
router.delete('/delete-recipe/:id', async (req, res) => {
    try {
        if(validateToken(req)) {
            const recipe = await Recipe.findById(req.params.id);
            await Recipe.deleteOne();
            res.status(200).send({success: true, message: 'recipe deleted'});
        } else {
            res.status(403).send({ success: false, message: "unauthorised." });
        }
    } catch (error) {
        res.status(500).send({success: false, message: error});
    }
});

module.exports = router;