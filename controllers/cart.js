// var carts = document.querySelectorAll('#addToCart');
// for (let i = 0; i < carts.length; i++) {
//     carts[i].addEventListener('click', () => {
//        console.log(carts[i].value);
//     })}

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const Product = require('../models/product');

const app = express();
const dbURI = 'mongodb+srv://syafii:flea311@cluster0.pqurf.mongodb.net/ssa?retryWrites=true&w=majority'

//connect mongoose

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
        console.log('connected to db')
    })
    .catch((err) => console.log(err));

app.post('/cart/:id', (req,res)=>{
    const id = req.params.id;
    Product.findById(id)
        .then((result)=>{
            res.redirect('products/cart')
        })
        .catch(err => console.log(err))
    })