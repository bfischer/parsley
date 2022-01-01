const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = Restaurant =  mongoose.model('restaurant', RestaurantSchema);