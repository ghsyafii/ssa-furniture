//this is where you'll find the main server, connection to database, main routes and middleware

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const cartController = require('./controllers/cartController');
const paymentController = require('./controllers/paymentController');
const paypal = require('paypal-rest-sdk');
const bodyParser = require('body-parser');

const Product = require('./models/product');


const PORT = process.env.PORT || 4000;
var MongoDBStore = require('connect-mongodb-session')(session);
const dbURI = require('./config/keys').MongoURI;
const client_Id = require('./config/keys').client_Id;
const client_secret = require('./config/keys').client_secret;

// const { ensureAuthenticated } = require('./config/auth');

const app = express();

//Passport config
require('./config/passport')(passport);

const store = new MongoDBStore({
    uri: dbURI,
    collection: 'sessions'
});

// configure paypal with the credentials you got when you created your paypal app
//allow parsing of JSON bodies
app.use(bodyParser.json());


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
    unset: 'destroy',
    name: 'session cookie'
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

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
app.use(express.urlencoded({ limit: '200mb', extended: true }));

//configure for sandbox environment
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': client_Id,
    'client_secret': client_secret
});

//routes


//main index
app.get('/', (req, res) => {
            Product.find().sort({ createdAt: -1 })
                .then(result => {
                    res.render('index', { title: 'Home', isLoggedIn: req.user, products: result })
                })
        });

//cart function

app.post('/cart/in-cart', cartController.AddToCart);

app.post('/cart/out-cart', cartController.RemoveFromCart);

app.post('/cart/remove-cart', cartController.DeleteCart);

//paypal, payment

app.post('/pay', paymentController.paymentStart);

app.get('/redirect', paymentController.successPayment);

app.get('/success', (req, res) =>
    res.render('success', {title: "Successful Payment", isLoggedIn: req.user}
    ));

app.get('/redirect', (req, res) =>
    res.render('redirect', {title: "Successful Payment", isLoggedIn: req.user}
    ));

app.get('/cancel', (req, res) =>
    res.render('cancel', {title: "Cancelled", isLoggedIn: req.user}
    ));



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

