const express = require('express');

const router = express.Router();

//import product_index
const productController = require('../controllers/productController');

//blog routes
router.get('/', productController.product_index);

// router.post('/', blogController.blog_create_post);
//
// router.get('/create', blogController.blog_create_get);
//
// //GET: Post by ID (include : in front of route parameter
//
// router.get('/:id', blogController.blog_details);
//
// //delete
// router.delete('/:id', blogController.blog_delete)
//
// //export router

module.exports = router;