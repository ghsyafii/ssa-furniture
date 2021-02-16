//this is where you'll find the routes for product pages.

const express = require('express');
const router = express.Router();
const cartItems = require('../models/cart-items');


//import product_index
const productController = require('../controllers/productController');

//product routes
router.get('/products-display', productController.product_index);

// router.get('/cart', (req, res) => {
//     res.render('products/cart', { title: 'Cart' });
// })

router.get('/cart', (req,res)=>{
    cartItems.find().sort({ createdAt: -1 })
        .then((result) => {

            //render to this route ie /blogs the index.ejs file and pass the title, and for the blogs, pass the result - refer to index html to see the relationships
            res.render('products/cart', { title: 'Cart Page', cartItems: result });
        })
        .catch((error) => {
            console.log(error)
        })

})


router.post('/', productController.product_create_post);

router.get('/create', productController.product_create_get);

//GET: Post by ID (include : in front of route parameter

router.get('/:id', productController.product_details);

//delete
router.delete('/:id', productController.product_delete)

//edit
router.get('/:id/edit', productController.product_update_get)

router.put('/:id', productController.product_update_put)

//export router

module.exports = router;