const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');
dotenv.config();

//App Config
const app = express();
app.use(express.json());

// routes
const authRoute = require('./routes/Auth');
const recipeRoute = require('./routes/Recipes');
app.use('/recipeapi/auth', authRoute);
app.use('/recipeapi/', recipeRoute);

// conn to DB
mongoose.connect(process.env.MONGO_URL).then(
    console.log('Connected to DB')
).catch((err) => console.log(err));

//Listener
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on localhost: ${port}`));