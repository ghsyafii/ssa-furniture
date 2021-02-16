//this is where you'll find the main server, connection to database, main routes and middleware

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const cartItems = require('./models/cart-items')
const methodOverride = require('method-override');
const session = require('express-session');
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

//set session
app.use(session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true
}));

//morgan middleware

app.use(morgan('dev'));

app.use(methodOverride('_method'));

//middleware to convert posts to right format

app.use(express.urlencoded({ extended: true }));

//routes

app.post('/cart/add', (req,res)=>{
    req.session.inCart = req.session.inCart||[];
    cartItems.exists({_id: req.body._id}, function(err,count){
        if(count > 0){
            console.log("yes");
            console.log(req.session.inCart);
            let x = req.body;
            let p ={
                name: x.name,
                price: x.price,
                quantity: 1
            }
            req.session.inCart.push(p);
            console.log(req.session.inCart);
            res.render('tester', {items: req.session.inCart});

        }else{
        const cart_Item = new cartItems(req.body);
        cart_Item.save()
            .then(result => {
                console.log("success");
                let p ={
                    name: cart_Item.name,
                    price: cart_Item.price,
                    quantity: 1
                }
                req.session.inCart.push(p);
                console.log(req.session.inCart);
                res.render('tester', {items: req.session.inCart});
                console.log("it is done")
                // res.redirect('/products/products-display');
            })
            .catch(err => console.log(err))
    }})

})


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

