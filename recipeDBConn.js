const mongoose = require('mongoose');
const dburi = 'mongodb://localhost:27017/recipeDB';
mongoose.connect(dburi);

const db = mongoose.connection;
db.on("error", (err) => { console.error(`error: ${err}`)});
db.on("connected", (err, res) => { console.log('Connected to database')});
