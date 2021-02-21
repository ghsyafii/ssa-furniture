//this is where you'll find the routes for product pages.

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


//import product_index
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');

//product routes
router.get('/products-display', productController.product_index);

router.get('/cart', (req,res)=>{
        if(req.user) {
                if(req.user.inCart.length !== 0){
                        res.render('products/cart', {cartItems: req.user.inCart, title: "Cart", isLoggedIn: req.user})}
                else{
                        req.user.inCart = req.session.inCart;
                        req.user.save();
                        res.render('products/cart', {cartItems: req.user.inCart, title: "Cart", isLoggedIn: req.user})
                }
        }
        else{
                res.render('products/cart', {cartItems: req.session.inCart, title: "Cart", isLoggedIn: req.user})
        }

})

router.post('/', productController.product_create_post);

router.get('/create', ensureAuthenticated, productController.product_create_get);

//GET: Post by ID (include : in front of route parameter

router.get('/:id', productController.product_details);

//delete
router.delete('/:id', productController.product_delete)

//edit
router.get('/:id/edit', productController.product_update_get)

router.put('/:id', productController.product_update_put)

//export router

module.exports = router;