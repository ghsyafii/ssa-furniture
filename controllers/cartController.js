// var carts = document.querySelectorAll('#addToCart');
// for (let i = 0; i < carts.length; i++) {
//     carts[i].addEventListener('click', () => {
//        console.log(carts[i].value);
//     })}

const express = require('express');
const session = require('express-session');


const AddToCart = (req,res)=>{
//naming the array within session cookie as inCart and storing as accordingly
    if(req.user){
        var value = 1;

    }
    else{
        var value = 2;
    }

    switch(value){
        case 1:
            req.user.inCart = req.session.inCart;
            req.session.inCart = req.user.inCart||[];
            console.log("HELLOOPOOOOOO");
            console.log(req.user.inCart);
            if(Array.isArray(req.session.inCart)&& req.session.inCart.length>0) {
                var itemLocation = req.session.inCart.map(item => item.name).indexOf(req.body.name);
                console.log(itemLocation);
                if (itemLocation !== -1) {
                    req.session.inCart.forEach(item => {
                        if (req.body.name === item.name) {
                            console.log("I found it" + item.name);
                            item.quantity += 1;
                            req.session.inCart.splice(itemLocation, 1, item);
                        }

                    })
                    res.render('products/cart', {cartItems: req.session.inCart, title: "Cart", isLoggedIn: req.user})
                } else{
                    console.log("this is neww yayyyyyyyyyyyyyyy");
                    let item2 = {
                        name: req.body.name,
                        image: req.body.image,
                        price: req.body.price,
                        quantity: 1
                    }
                    req.session.inCart.push(item2);
                    res.render('products/cart', {cartItems: req.session.inCart, title: "Cart", isLoggedIn: req.user})
                    console.log("PLEASE WORKKKKKKK2");
                }


            }else{
                console.log("ollaaaaa")
                let item = {
                    name: req.body.name,
                    image: req.body.image,
                    price: req.body.price,
                    quantity: 1
                }
                req.session.inCart.push(item);
                res.render('products/cart', {cartItems: req.session.inCart, title: "Cart", isLoggedIn: req.user})
            }

            req.user.inCart = req.session.inCart;
            req.user.save();

            break;

        case 2:
            req.session.inCart = req.session.inCart||[];
            console.log("move it move it");
            if(Array.isArray(req.session.inCart)&& req.session.inCart.length>0) {
                var itemLocation = req.session.inCart.map(item => item.name).indexOf(req.body.name);
                console.log(itemLocation);
                if (itemLocation !== -1) {
                    req.session.inCart.forEach(item => {
                        if (req.body.name === item.name) {
                            console.log("I found it" + item.name);
                            item.quantity += 1;
                            req.session.inCart.splice(itemLocation, 1, item);
                        }
                        console.log(req.session.inCart);


                    })
                    res.redirect("/products/cart");
                } else{

                    let item2 = {
                        name: req.body.name,
                        image: req.body.image,
                        price: req.body.price,
                        quantity: 1
                    }
                    req.session.inCart.push(item2);
                    res.redirect("/products/cart");
                    console.log('misleading text here, sorry to ollaaaaa unit');
                }


            }else{
                console.log("ollaaaaa")
                let item = {
                    name: req.body.name,
                    image: req.body.image,
                    price: req.body.price,
                    quantity: 1
                }
                req.session.inCart.push(item);

                res.redirect("/products/cart");

            }
            break;

        default:
            console.log("nothing");
            break;

    }//switch ends here


}


const RemoveFromCart = (req,res)=>{
//naming the array within session cookie as inCart and storing as accordingly
    if(req.user){
        var value = 1;
    }
    else{
        var value = 2;
    }

    switch(value){
        case 1:
            req.session.inCart = req.user.inCart||[];
            console.log("HELLOOPOOOOOO");
            console.log(req.user.inCart);
            var itemLocation = req.session.inCart.map(item => item.name).indexOf(req.body.name);
            if (itemLocation !== -1) {
                req.session.inCart.forEach(item => {
                    if (req.body.name === item.name) {
                        if (req.body.quantity === "0") {
                            req.session.inCart.splice(itemLocation, 1);
                        }
                        else{
                            let item = {
                                name: req.body.name,
                                image: req.body.image,
                                price: req.body.price,
                                quantity: parseInt(req.body.quantity)
                            }
                            req.session.inCart.splice(itemLocation, 1, item);
                            console.log(req.session.inCart);
                        }
                        console.log("I found it" + item.name);
                        // res.render("products/cart", {cartItems: req.session.inCart, title: "Cart", isLoggedIn: req.user});
                        res.redirect("/products/cart");

                    }


                })

            } else{
                console.log("hello it really isnt here friend")
            }
            req.user.inCart = req.session.inCart;
            req.user.save();

            break;

        case 2:
            req.session.inCart = req.session.inCart||[];
            console.log("move it move it move itttttttttttttttttt");
            if(Array.isArray(req.session.inCart)&& req.session.inCart.length>0) {
                var itemLocation = req.session.inCart.map(item => item.name).indexOf(req.body.name);
                console.log(itemLocation);
                if (itemLocation !== -1) {
                    req.session.inCart.forEach(item => {
                        if (req.body.name === item.name) {
                            if (req.body.quantity === "0") {
                                req.session.inCart.splice(itemLocation, 1);
                            }
                            else{
                                let item = {
                                    name: req.body.name,
                                    image: req.body.image,
                                    price: req.body.price,
                                    quantity: parseInt(req.body.quantity)
                                }
                                req.session.inCart.splice(itemLocation, 1, item);
                                console.log(req.session.inCart);
                            }
                            console.log("I found it" + item.name);
                            // res.render("products/cart", {cartItems: req.session.inCart, title: "Cart", isLoggedIn: req.user});
                            res.redirect("/products/cart");

                        }


                    })

                } else{
                    console.log("hello it really isnt here friend")
                }


            }
            break;

        default:
            console.log("nothing");
            break;

    }//switch ends here


}

const DeleteCart = (req,res)=>{
//naming the array within session cookie as inCart and storing as accordingly
    if(req.user){
        var value = 1;
    }
    else{
        var value = 2;
    }

    switch(value){
        case 1:
            req.session.inCart = req.user.inCart||[];
            if(Array.isArray(req.session.inCart)&& req.session.inCart.length>0) {
                var itemLocation = req.session.inCart.map(item => item.name).indexOf(req.body.name);
                console.log(itemLocation);
                if (itemLocation !== -1) {
                    req.session.inCart.forEach(item => {
                        if (req.body.name === item.name) {
                            console.log("I found it" + item.name);
                            item.quantity -= item.quantity;
                            if(item.quantity === 0){
                                req.session.inCart.splice(itemLocation, 1);
                                res.redirect("/products/cart");
                            }
                            else{
                                req.session.inCart.splice(itemLocation, 1, item);
                                res.redirect("/products/cart");
                            }

                        }

                    })

                } else{
                    console.log("no such thing la");
                }


            }else{
                console.log("ollaaaaa");
            }

            req.user.inCart = req.session.inCart;
            req.user.save();

            break;

        case 2:
            req.session.inCart = req.session.inCart||[];
            console.log("move it move it move itttttttttttttttttt");
            if(Array.isArray(req.session.inCart)&& req.session.inCart.length>0) {
                var itemLocation = req.session.inCart.map(item => item.name).indexOf(req.body.name);
                console.log(itemLocation);
                if (itemLocation !== -1) {
                    req.session.inCart.forEach(item => {
                        if (req.body.name === item.name) {
                            console.log("I found it" + item.name);
                            item.quantity -= item.quantity;
                            if (item.quantity === 0) {
                                req.session.inCart.splice(itemLocation, 1);
                                res.redirect("/products/cart");
                            }
                            else{
                                req.session.inCart.splice(itemLocation, 1, item);
                            }

                        }

                    })

                } else{
                    console.log("hello it really isnt here friend")
                }


            }
            break;

        default:
            console.log("nothing");
            break;

    }//switch ends here


}

module.exports={AddToCart, RemoveFromCart, DeleteCart}