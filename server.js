const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require ('method-override');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const PORT = process.env.PORT ? process.env.PORT : '4000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

const User = require('./models/user.js');
app.use(passUserToView);
app.get('/', async (req, res) => {
    if(req.session.user) {
        res.redirect()
    }
    res.render('home.ejs')

app.use(isSignedIn);
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
});