require('dotenv').config();
let stripe = require('stripe')(process.env.S_STRIPE_KEY);

module.exports = {
    getUser: (req, res, next) => {
        const db = req.app.get('db');
        if (!req.session.passport) {
            res.send('Please log in or create an account')
        } else {

            db.findSessionUser(req.session.passport.user).then(user => {
                console.log('user', user)
                if (user !== undefined) {
                    if (user[0].orderid === null) {
                        db.createOrder(req.session.passport.user)
                    }
                    res.status(200).send(user);
                } else {
                    res.status(401).send(alert('Please create and account'));
                }

            })
        }
    },

    getParts: (req, res, next) => {
        const db = req.app.get('db');

        db.getAllParts().then(parts => {
            res.status(200).send(parts);
        })
    },

    addCart: async (req, res, next) => {
        console.log(req.session)
        let allItems = [];
        let endTotal = 0;
        let idObj = {};
        try {
            const db = req.app.get('db');

            order = await db.getOrder(req.body.id)
            if (!order[0]) {
                const newOrder = await db.createOrder(req.body.id);
                idObj = await Object.assign({}, newOrder.orderId, { orderID: newOrder.orderId })
                const addToCart = await db.addToCart(newOrder.orderId, newOrder.orderId, req.body.productId, req.body.quantity)
            } else {
                idObj = await Object.assign({}, order[0].orderid, { orderID: order[0].orderid })
                const addToCart = await db.addToCart(order[0].orderid, order[0].orderid, req.body.productId, req.body.quantity)
            }
            res.send(idObj)
        } catch (err) {
            console.log(err);
        }
    },

    getOrder: (req, res, next) => {
        const db = req.app.get('db');
        console.log(req.params.id)

        db.getOrder(req.params.id).then(order => {
            console.log(order);
            res.status(200).send(order);
        })
    },

    getCartItems: (req, res, next) => {
        const db = req.app.get('db');
        let cartTotal = 0;

        db.getCartItems(req.params.id).then(cart => {
            console.log(cart)
            cart.map((val, i) => {
                let priceInNum = parseFloat(val.price);
                return cartTotal += priceInNum
            })
            console.log(cartTotal);
            cartTotalString = cartTotal.toString().split('')
            indexOfDecimal = cartTotalString.indexOf('.');
            cartTotalString = cartTotalString.slice(0, indexOfDecimal + 3).join('');
            cartTotal = parseFloat(cartTotalString);
            res.status(200).send([cart, cartTotal])
        })
    },

    deleteFromCart: (req, res, next) => {
        const db = req.app.get('db');

        db.deleteFromCart([req.body.prodid, req.body.ordid]).then(newList => {
            res.status(200).send(newList);
        })
    },

    updateTotal: (req, res, next) => {
        const db = req.app.get('db');

        db.updateTotal([req.body.orderid, req.body.total]).then(updatedTotal => {
            res.status(200).send(updatedTotal);
        })
    },

    createPayment: async (req, res, next) => {
        console.log(req.body);
        const db = req.app.get('db');
        const charge = await stripe.charges.create({
            amount: req.body.amount, // amount in cents, again
            currency: 'usd',
            source: req.body.token.id,
            description: 'Test charge from react app'
        }, function (err, charge) {
            console.log(err);
            if (err) return res.sendStatus(500)
            return res.sendStatus(200);
        });
        const dropOrder = db.detachOrderFromUser([req.body.orderId, req.body.userId])
    }
}