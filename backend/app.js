const express = require("express");
const app = express();
const cors = require('cors');

//CONFIGS
app.use(express.json());
app.use(cors()); 


// IMPORT ROUTES
const categoryRoutes = require('./routes/category');



require('dotenv').config();


// USE ROUTES
app.use('/category', categoryRoutes);


module.exports = app;