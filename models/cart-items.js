const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItem_Schema = new Schema({
    _id:{
        type: String
    },
    name: {
        type: String
    },
    image: {
        // type: String,
        type: Buffer,
        required: true
    },
    price: {
        type: Number,

    },
    quantity: {
        type: Number
    }
}, { timestamps: true });

const cart_item = mongoose.model('cart_item', cartItem_Schema);
module.exports = cart_item;