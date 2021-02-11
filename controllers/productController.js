const Product = require('../models/product');

const product_index = (req, res) => {
    //.find() finds all stuff in collection
    //.sort() sorts it by some standard, same -1 +1 rule as JS
    Product.find().sort( { createdAt: -1 })
        .then((result) => {
            //render to this route ie /blogs the index.ejs file and pass the title, and for the blogs, pass the result - refer to index html to see the relationships
            res.render('products/products-display', { title: 'All Products', products: result});
        })
        .catch((error) => {
            console.log(error)
        })
}

const cart_page =(req,res) =>{
    res.render('../views/products/cart.ejs')
}

module.exports = { product_index, cart_page }

// module.exports = { product_index, product_details, product_create_get, product_create_post, product_delete }