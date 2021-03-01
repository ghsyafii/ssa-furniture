//this is where you'll find the GET, POST, PUT, DELETE logic

const Product = require('../models/product');

//GET ALL PRODUCTS

const product_index = (req,res) => {
    //.find() finds all stuff in collection
    //.sort() sorts it by some standard, same -1 +1 rule as JS
    Product.find().sort({ createdAt: -1 })
        .then((result) => {
            //render to this route ie /blogs the index.ejs file and pass the title, and for the blogs, pass the result - refer to index html to see the relationships
            res.render('products/products-display', { title: 'All Products', products: result, isLoggedIn: req.user });
        })
        .catch((error) => {
            console.log(error)
        })
}

//GET SINGLE PRODUCT BY ID

const product_details = (req,res) => {
    //get id from req object (the last bit ".id in this case" corresponds to whatever comes after :)
    const id = req.params.id;
    Product.findById(id)
        .then(result => {
            res.render('products/details', { product : result, title: 'Product Details', isLoggedIn: req.user });
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Product not found', isLoggedIn: req.user })
        })
}

//GET CREATE NEW PRODUCT PAGE

const product_create_get = (req,res) => {
    if(req.user.isAdmin == true){
    Product.find().sort({ createdAt: -1 })
        .then((result) => {
            //render to this route ie /blogs the index.ejs file and pass the title, and for the blogs, pass the result - refer to index html to see the relationships
            res.render('products/create', { title: 'Admin Page', products: result, isLoggedIn: req.user });
        })
        .catch((error) => {
            console.log(error)
        })
}
 else {
        req.flash('error_msg', 'Only administrators can view that page.');
        res.redirect('/users/login');
    }
}

//GET UPDATE PRODUCT %%%%%

const product_update_get = async (req,res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('products/edit', { product, title: 'Edit', isLoggedIn: req.user})
}

//POST NEW PRODUCT

const product_create_post = (req,res) => {
    const product = new Product(req.body)
    saveImage(product, req.body.imageURL)
    product.save()
        .then(result => {
            res.redirect('products/create');
        })
        .catch(err => console.log(err))
}

//DELETE PRODUCT

const product_delete = (req,res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/products/create' })
        })
        .catch(err => console.log(err))
}

//try to put
const product_update_put = async (req,res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/create`)
}

function saveImage(product, imageEncoded){
    if (imageEncoded == null) {
        return
    }
    const imageURL = JSON.parse(imageEncoded)
    if (imageURL != null){
        product.imageURL = new Buffer.from(imageURL.data, 'base64')
        product.imageType = imageURL.type
    }
}

module.exports = { product_index, product_details, product_create_get, product_create_post, product_delete, product_update_put, product_update_get }