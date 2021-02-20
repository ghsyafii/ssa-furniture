//this is where you'll find the main server, connection to database, main routes and middleware

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartItems = require('./models/cart-items')
const methodOverride = require('method-override');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const passport = require('passport');

const PORT = process.env.PORT || 4000;
var MongoDBStore = require('connect-mongodb-session')(session);
const dbURI = require('./config/keys').MongoURI

// const { ensureAuthenticated } = require('./config/auth');

const app = express();

//Passport config
require('./config/passport')(passport);

//connect to MongoDB

// const dbURI = 'mongodb+srv://syafii:flea311@cluster0.pqurf.mongodb.net/ssa?retryWrites=true&w=majority'
// const store = new MongoDBStore({
//     uri: 'mongodb+srv://syafii:flea311@cluster0.pqurf.mongodb.net/ssa?retryWrites=true&w=majority',
//     collection: 'sessions'
// });

//TODO: add config to .gitignore to protect password
const store = new MongoDBStore({
    uri: dbURI,
    collection: 'sessions'
});

//connect mongoose

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
        console.log('connected to db')
    })
    .catch((err) => console.log(err));

//register view engine

// app.use(expressLayouts);
app.set('view engine', 'ejs');

app.listen(PORT, console.log(PORT));

//grant access to static files

app.use(express.static('public'));

//set session
app.use(session({
    secret: 'secret session key',
    //TODO: change resave to true if not working - test
    resave: false,
    saveUninitialized: true,
    store: store,
    // unset: 'destroy',
    name: 'session cookie'
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//morgan middleware

app.use(morgan('dev'));

app.use(methodOverride('_method'));

// authenticated test
app.use((req,res,next) => {
    res.locals.login = req.isAuthenticated();
    next();
})

//middleware to convert posts to right format

//TODO: Check if it should be false
app.use(express.urlencoded({ extended: true }));

//routes


// app.post('/cart/in-cart', (req,res)=>{
// //naming the array within session cookie as inCart and storing as accordingly
//     req.session.inCart = req.session.inCart||[];
//             console.log("yes");
//     (req.session.name);
//             console.log(req.session.inCart);
//             if(req.session.name !== "undefined") {
//                 let item = {
//                     name: req.body.name,
//                     price: req.body.price,
//                     quantity: 1
//                 }
//                 req.session.inCart.push(item);
//                 console.log(req.session.inCart);
//                 res.render('products/cart', {cartItems: req.session.inCart, title: "Cart", isLoggedIn: req.user})
//                 console.log('booo')
//             }else{
//                 console.log("ollaaaaa")
//                 let x = req.body
//                 let item = {
//                     name: req.body.name,
//                     price: req.body.price,
//                     quantity: 1
//                 }
//                 req.session.inCart.push(item);
//                 console.log(req.session.inCart);
//                 res.render('products/cart', {cartItems: req.session.inCart, title: "Cart"})
//                 console.log('empty')
//             }
//
//
//
// })

app.post('/cart/in-cart', (req,res)=>{
//naming the array within session cookie as inCart and storing as accordingly
    req.session.inCart = req.session.inCart||[];
    console.log("HELLOOPOOOOOO");
    console.log(req.user.inCart);
    if(Array.isArray(req.user.inCart)&& req.user.inCart.length>0) {
        var itemLocation = req.user.inCart.map(item => item.name).indexOf(req.body.name);
        console.log(itemLocation);
        if (itemLocation !== -1) {
            req.user.inCart.forEach(item => {
                if (req.body.name === item.name) {
                    console.log("I found it" + item.name);
                    console.log(req.user.inCart);
                    item.quantity += 1;
                    req.user.inCart.splice(itemLocation, 1, item);
                }
                console.log(req.session.inCart);
                // req.user.inCart.push(item);
                req.user.save();
                console.log(item);
                console.log("PLEASE WORKKKKKKK1");
                console.log(req.user.inCart);

            })
            res.render('products/cart', {cartItems: req.user.inCart, title: "Cart", isLoggedIn: req.user})
            console.log('booo')
        } else{
                console.log("this is neww yayyyyyyyyyyyyyyy");
                let item2 = {
                    name: req.body.name,
                    price: req.body.price,
                    quantity: 1
                }
            req.user.inCart.push(item2);
                console.log(req.user.inCart);
                res.render('products/cart', {cartItems: req.user.inCart, title: "Cart", isLoggedIn: req.user})
                console.log('misleading text here, sorry to ollaaaaa unit');
            req.user.save();
            console.log(item2);
            console.log("PLEASE WORKKKKKKK2");
            console.log(req.user.inCart);
            }


    }else{
        console.log("ollaaaaa")
        let item = {
            name: req.body.name,
            price: req.body.price,
            quantity: 1
        }
        req.user.inCart.push(item);
        console.log(req.user.inCart);
        res.render('products/cart', {cartItems: req.user.inCart, title: "Cart", isLoggedIn: req.user})
        console.log('empty')
        req.user.save();
        console.log(item);
        console.log("PLEASE WORKKKKKKK3");
        console.log(req.user.inCart);
    }



})


//main index
app.get('/', (req, res) => {
            res.render('index', {title: 'Home', isLoggedIn: req.user})
        });



//about
app.get('/about', (req, res) => {
    res.render('about', { title: 'About', isLoggedIn: req.user });
});

//contact
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact', isLoggedIn: req.user });
});

//product routes
app.use('/products', productRoutes);

app.use('/users', userRoutes);

//404
app.use((req, res) => {
    res.status(404).render('404', { title: '404', isLoggedIn: req.user });
})

//global variables
app.use(()=> (req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
