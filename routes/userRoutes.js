const express = require('express');
const router = express.Router();

router.get('/login', (req,res) => {
    res.render('login', { title: 'Login'});
})

router.get('/register', (req,res) => {
    res.render('register', { title: 'Register'});
})

module.exports = router;