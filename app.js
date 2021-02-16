//this is where you'll find the main server, connection to database, main routes and middleware

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const cartItems = require('./models/cart-items')
const methodOverride = require('method-override');

const app = express();

//connect to MongoDB

const dbURI = 'mongodb+srv://syafii:flea311@cluster0.pqurf.mongodb.net/ssa?retryWrites=true&w=majority'

//connect mongoose

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
        console.log('connected to db')
    })
    .catch((err) => console.log(err));

//register view engine

app.set('view engine', 'ejs');

app.listen(process.env.PORT || 4000);

//grant access to static files

app.use(express.static('public'));

//morgan middleware

app.use(morgan('dev'));

app.use(methodOverride('_method'));

//middleware to convert posts to right format

app.use(express.urlencoded({ extended: true }));

//routes

app.post('/cart/add', (req,res)=>{
    cartItems.exists({_id: req.body._id}, function(err,count){
        if(count > 0){
            console.log("yes")
            cartItems._id.quantity+=1;
        }else{
        const cart_Item = new cartItems(req.body, {quantity: 0});
        cart_Item.save()
            .then(result => {
                console.log("success");
                res.redirect('/products/products-display');
            })
            .catch(err => console.log(err))
    }})

})

// app.get('/cart', (req,res)=>{
//     cartItems.find().sort({ createdAt: -1 })
//         .then((result) => {
//             //render to this route ie /blogs the index.ejs file and pass the title, and for the blogs, pass the result - refer to index html to see the relationships
//             res.render('products/cart', { title: 'Cart Page', cartItems: result });
//         })
//         .catch((error) => {
//             console.log(error)
//         })
//
// })

//main index
app.get('/', (req, res) => {
    res.render('index', { title: 'Home'})
});

//about
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//contact
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

//product routes
app.use('/products', productRoutes);

//404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})

