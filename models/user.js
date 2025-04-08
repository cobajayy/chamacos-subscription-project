const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brewingMethod: {
        type: String,
        enum: ['Drip', 'Pour Over', 'Espresso', 'French Press'], 
        required: true,
    }, 
    caffeine: {
        type: String,
        enum: ['Regular', 'Decaf'],
        required: true,
    },
    beans: {
        type: String,
        enum: ['Whole', 'Ground'],
        required: true,
    },
    roast: {
        type: String,
        enum: ['Light', 'Medium', 'Dark'],
        required: true,
    },
    origin: {
        type: String,
        enum: ['South America', 'North America', 'Africa', 'Asia'],
        required: true,
    },
    quantity: {
        type: String,
        enum: ['1 Lb', '2 Lbs', '5 Lbs'],
        required: true,
    },
    deliveryFrequency: {
        type: String,
        enum: ['Every Week', '2 Weeks', '3 Weeks', '4 Weeks'],
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    subscriptions: [subscriptionSchema]

});

const User = mongoose.model('User', userSchema);

module.exports = User;