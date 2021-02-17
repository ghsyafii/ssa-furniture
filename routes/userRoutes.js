const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//User model

const User = require('../models/user');

router.get('/login', (req,res) => {
    res.render('login', { title: 'Login'});
})

router.get('/register', (req,res) => {
    res.render('register', { title: 'Register'});
})

router.post('/register', (req,res) => {
    const { name, email, password } = req.body;
    let errors = [];

    //check required fields
    if(!name || !email || !password) {
        errors.push({msg: 'Please fill in all fields.'})
    }
    //check pass length
    if(password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters.'})
    }

    if(errors.length > 0) {
        res.render('register', { title: 'Register',
            errors,
            name,
            email,
            password
        })
    } else {
        //validation passed
        //check if user doesn't exist before adding to db
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    errors.push({msg: 'Email is already registered'})
                    res.render('register', { title: 'Register',
                        errors,
                        name,
                        email,
                        password
                    })
                } else {
                    const newUser = new User({
                        name, email, password
                    })
                    //hash the password
                    bcrypt.genSalt(10, (err,salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                    //set password to hash
                        newUser.password = hash;
                        //save user
                        newUser.save()
                            .then(user => {
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err))
                    }))
                }
            })
    }
})

module.exports = router;