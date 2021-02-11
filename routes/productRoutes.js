//this is where you'll find the routes for product pages.

const express = require('express');

const router = express.Router();

//import product_index
const productController = require('../controllers/productController');

//blog routes
router.get('/products-display', productController.product_index);

router.get('/cart', (req, res) => {
    res.render('products/cart', { title: 'Cart' });
})

router.post('/', productController.product_create_post);

router.get('/create', productController.product_create_get);

//GET: Post by ID (include : in front of route parameter

router.get('/:id', productController.product_details);

//delete
router.delete('/:id', productController.product_delete)

//export router

module.exports = router;