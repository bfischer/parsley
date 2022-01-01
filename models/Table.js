const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    status: {
        type: String
    },
})

module.exports = Table =  mongoose.model('table', TableSchema);