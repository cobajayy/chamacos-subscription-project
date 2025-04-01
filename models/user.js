const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    brewingMethod: {
        type: String,
        enum: ['drip', 'pour-over', 'espresso', 'french press'], 
        required: true,
    }, 
    caffiene: {
        type: String,
        enum: ['regular', 'decaf'],
        required: true,
    },
    roast: {
        type: String,
        enum: ['light', 'medium', 'dark', 'whichever'],
        required: true,
    },
    origin: {
        type: String,
        enum: ['south american', 'north american', 'africa', 'asia'],
        required: true,
    },
    quantity: {
        type: String,
        enum: ['1 lbs', '2 lbs', '5 lbs'],
        required: true,
    },
    deliveryFrequency: {
        type: String,
        enum: ['1 week', '2 weeks', '3 weeks', '4 weeks'],
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