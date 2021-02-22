const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');


//User model

const User = require('../models/user');

router.get('/login', (req,res) => {
    res.render('login', { title: 'Login', isLoggedIn: req.user});
})

router.get('/register', (req,res) => {
    res.render('register', { title: 'Register', isLoggedIn: req.user});
})

router.post('/register', (req,res) => {
    const { name, email, password } = req.body;
    let errors = [];

    //check required fields
    if(!name || !email || !password) {
        errors.push({msg: 'Please fill in all fields.', isLoggedIn: req.user})
    }
    //check pass length
    if(password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters.', isLoggedIn: req.user})
    }

    if(errors.length > 0) {
        res.render('register', { title: 'Register',
            errors,
            name,
            email,
            password,
            isLoggedIn: req.user
        })
    } else {
        //validation passed
        //check if user doesn't exist before adding to db
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    errors.push({msg: 'Email is already registered.'})
                    res.render('register', { title: 'Register',
                        errors,
                        name,
                        email,
                        password,
                        isLoggedIn: req.user
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
                                req.flash('success_msg', 'You are now registered and can log in.');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err))
                    }))
                }
            })
    }
})

// login handle - to delete

// router.post('/login', (req,res,next) => {
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req,res,next)
// });

//redirect admin to create page instead of index

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }),
    function(req, res) {
        if (req.user.isAdmin == true){
            res.redirect('/products/create')
        }
        else if (req.user) {
            res.redirect('/')
        }
    });

//logout handle

router.get('/logout', (req,res) => {
    // req.logout();
    req.flash('success_msg', 'You are logged out');
    req.session.save();
    req.session.regenerate(err => {
        res.redirect('/users/login');
    })
})

module.exports = router;