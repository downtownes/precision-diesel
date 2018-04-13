module.exports = {
    getUser: (req, res, next) => {
        const db = req.app.get('db');
        if (!req.session.passport) {
            res.send('Please log in or create an account')
        } else {

            db.findSessionUser(req.session.passport.user).then(user => {
                console.log('user', user)
                if (user !== undefined) {
                    if(user[0].orderid === null) {
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
                idObj = await Object.assign({}, newOrder.orderId, {orderID: newOrder.orderId})
                const addToCart = await db.addToCart(newOrder.orderId, newOrder.orderId, req.body.productId, req.body.quantity)
                const cartTotal = await db.getTotal(newOrder.orderId);
                cartTotal.map( (val, i) => {
                    allItems.push(val.price * val.quantity)
                });
                allItems.reduce( (accum, currVal, i) => {
                    endTotal +=currVal
                })
                updatedTotalColumn = await db.updateTotal(req.body.id, endTotal)
            } else {
                idObj =  await Object.assign({}, order[0].orderid, {orderID: order[0].orderid})
                const addToCart = await db.addToCart(order[0].orderid, order[0].orderid, req.body.productId, req.body.quantity)
                const cartTotal = await db.getTotal(order[0].orderid)
                cartTotal.map( (val, i) => {
                    console.log('cartTotal', cartTotal)
                    allItems.push(val.price * val.quantity)
                });
                const reducedItems = await allItems.reduce( (accum, currVal, i) => {
                    console.log(reducedItems)
                    endTotal +=currVal
                })
                updatedTotalColumn = await db.updateTotal(req.body.id, endTotal)
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

        db.getCartItems(req.params.id).then(cart => {
            console.log('cart', cart)
            res.status(200).send(cart)
        })
    }
}