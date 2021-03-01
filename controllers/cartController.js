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
            // console.log(req.user.inCart);
            if(Array.isArray(req.session.inCart)&& req.session.inCart.length>0) {
                var itemLocation = req.session.inCart.map(item => item.name).indexOf(req.body.name);
                // console.log(itemLocation);
                if (itemLocation !== -1) {
                    req.session.inCart.forEach(item => {
                        if (req.body.name === item.name) {
                            item.quantity += 1;
                            req.session.inCart.splice(itemLocation, 1, item);
                        }

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
                }


            }else{
                let item = {
                    name: req.body.name,
                    image: req.body.image,
                    price: req.body.price,
                    quantity: 1
                }
                req.session.inCart.push(item);
                res.redirect("/products/cart");
            }

            req.user.inCart = req.session.inCart;
            req.user.save();

            break;

        case 2:
            req.session.inCart = req.session.inCart||[];
            if(Array.isArray(req.session.inCart)&& req.session.inCart.length>0) {
                var itemLocation = req.session.inCart.map(item => item.name).indexOf(req.body.name);
                // console.log(itemLocation);
                if (itemLocation !== -1) {
                    req.session.inCart.forEach(item => {
                        if (req.body.name === item.name) {
                            item.quantity += 1;
                            req.session.inCart.splice(itemLocation, 1, item);
                        }
                        // console.log(req.session.inCart);


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
                }


            }else{
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
            // console.log("nothing");
            break;

    }//switch ends here


}


const RemoveFromCart = (req,res)=>{
    if(req.user){
        var value = 1;
    }
    else{
        var value = 2;
    }

    switch(value){
        case 1:
            req.session.inCart = req.user.inCart||[];
            // console.log(req.user.inCart);
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
                            // console.log(req.session.inCart);
                        }
                        res.redirect("/products/cart");

                    }

                })

            } else{
                console.log("error")
            }
            req.user.inCart = req.session.inCart;
            req.user.save();

            break;

        case 2:
            req.session.inCart = req.session.inCart||[];
            if(Array.isArray(req.session.inCart)&& req.session.inCart.length>0) {
                var itemLocation = req.session.inCart.map(item => item.name).indexOf(req.body.name);
                // console.log(itemLocation);
                if (itemLocation !== -1) {
                    req.session.inCart.forEach(item => {
                        if (req.body.name === item.name) {
                            if (req.body.quantity === "0") {
                                req.session.inCart.splice(itemLocation, 1);
                            }
                            else{
                                let item = {
                                    name: req.body.name,
                                    image:req.body.image,
                                    price: req.body.price,
                                    quantity: parseInt(req.body.quantity)
                                }
                                req.session.inCart.splice(itemLocation, 1, item);
                            }
                            res.redirect("/products/cart");

                        }


                    })

                } else{
                    console.log("error")
                }


            }
            break;

        default:
            console.log("nothing is found");
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
                // console.log(itemLocation);
                if (itemLocation !== -1) {
                    req.session.inCart.forEach(item => {
                        if (req.body.name === item.name) {
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
                    console.log("error");
                }


            }else{
                console.log("error");
            }

            req.user.inCart = req.session.inCart;
            req.user.save();

            break;

        case 2:
            req.session.inCart = req.session.inCart||[];
            if(Array.isArray(req.session.inCart)&& req.session.inCart.length>0) {
                var itemLocation = req.session.inCart.map(item => item.name).indexOf(req.body.name);
                // console.log(itemLocation);
                if (itemLocation !== -1) {
                    req.session.inCart.forEach(item => {
                        if (req.body.name === item.name) {
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
                    console.log("error")
                }

            }
            break;

        default:
            console.log("error");
            break;

    }//switch ends here


}

const cartDisplay =(req,res)=>{
    if(req.user) {
        if(req.user.inCart.length !== 0){
            res.render('products/cart', {cartItems: req.user.inCart, title: "Cart", isLoggedIn: req.user})}
        else{
            req.user.inCart = req.session.inCart;
            req.user.save();
            res.render('products/cart', {cartItems: req.user.inCart, title: "Cart", isLoggedIn: req.user})
        }
    }
    else{
        res.render('products/cart', {cartItems: req.session.inCart, title: "Cart", isLoggedIn: req.user})
    }

}

module.exports={AddToCart, RemoveFromCart, DeleteCart, cartDisplay}