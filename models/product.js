//this is where you'll find the schema for the product collection

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: Buffer,
        required: true
    },
    imageType: {
    type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;