const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

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

//middleware to convert posts to right format

app.use(express.urlencoded({ extended: true }));

//routes

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

//404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})
