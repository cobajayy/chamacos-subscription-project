const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require ('method-override');

const PORT = process.env.PORT ? process.env.PORT : '6000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const User = require('./models/user.js');

app.get('/', async (req, res) => {
    res.render('home.ejs')
});

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
});