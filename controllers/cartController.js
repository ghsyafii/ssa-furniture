// var carts = document.querySelectorAll('#addToCart');
// for (let i = 0; i < carts.length; i++) {
//     carts[i].addEventListener('click', () => {
//        console.log(carts[i].value);
//     })}

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cartItems = require('../models/cart-items');

const app = express();
const dbURI = 'mongodb+srv://syafii:flea311@cluster0.pqurf.mongodb.net/ssa?retryWrites=true&w=majority'
app.set('view engine', 'ejs');
app.listen(process.env.PORT || 4000);
//grant access to static files
app.use(express.static('public'));
//morgan middleware
app.use(morgan('dev'));
//middleware to convert posts to right format
app.use(express.urlencoded({ extended: true }));
//connect mongoose

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
        console.log('connected to db')
    })
    .catch((err) => console.log(err));

// app.post('/cart/add', (req,res)=>{
//     const cart_Item = new cartItems(req.body);
//     cart_Item.save()
//         .then(result => {
//             console.log("success");
//             res.redirect('products/products-display');
//         })
//         .catch(err => console.log(err))
//     })