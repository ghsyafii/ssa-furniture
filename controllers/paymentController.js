const paypal = require('paypal-rest-sdk');

const paymentStart = (req, res) => {
    const total = req.body.totalprice;
    const cart = req.session.inCart;

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://ssa-furniture.herokuapp.com/redirect",
            "cancel_url": "http://ssa-furniture.herokuapp.com/cancel"
        },
        "transactions": [{
            "item_list": {
                "items":
                    cart.map((product) => {
                        return {
                            name: product.name,
                            sku: product._id,
                            price: product.price,
                            currency: "SGD",
                            quantity: product.quantity
                        }
                    }),
            },
            "amount": {
                "currency": "SGD",
                "total": total
            },
            "description": "Thank you for shopping with Us!"
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });

};

const successPayment = (req, res) => {
    var paymentId = req.query.paymentId;
    var payerId = { payer_id: req.query.PayerID };

    paypal.payment.execute(paymentId, payerId, function(error, payment){
        if(error){
            console.error(JSON.stringify(error));
        } else {
            if (payment.state == 'approved'){
                if(req.user){
                    req.session.inCart =[];
                    req.user.inCart =[];
                    req.user.save();
                    res.redirect('http://ssa-furniture.herokuapp.com/success');
                }else{
                    req.session.inCart = [];
                    res.redirect('http://ssa-furniture.herokuapp.com/success');
                }

            } else {
                res.redirect('http://ssa-furniture.herokuapp.com/cancel')
            }
        }
    });
};


module.exports ={paymentStart, successPayment}