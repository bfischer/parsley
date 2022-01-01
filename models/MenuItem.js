const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number
    },
})

MenuItemSchema.path('price').get(function(num) {
    return (num / 100).toFixed(2);
  });
  
MenuItemSchema.path('price').set(function(num) {
    return num * 100;
});

module.exports = MenuItem =  mongoose.model('menuItem', MenuItemSchema);