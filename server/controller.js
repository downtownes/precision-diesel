module.exports = {
    getUser: (req, res, next) => {
        const db = req.app.get('db');
        console.log(req.user)
        if (!req.session.passport) {
            res.send('Please log in or create an account')
        } else {

            db.findSessionUser(req.session.passport.user).then(user => {
                if (user !== undefined) {
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
        try {
            const db = req.app.get('db');
            console.log('req.body.id', req.body.id)

            order = await db.getOrder(req.body.id)
            console.log('order', order);
            if (!order[0]) {
                const newOrder = await db.createOrder(req.body.id);
                console.log('newOrder', newOrder);
                const addToCart = await db.addToCart(newOrder.orderId, newOrder.orderId, req.body.prodId, req.body.qty)
                const cartTotal = await db.getTotal(newOrder.orderId);
                console.log('added', req.body.qty)
            } else {
                const addToCart = await db.addToCart(order[0].orderid, order[0].orderid, req.body.productId, req.body.qty)
                const cartTotal = await db.getTotal(order[0].orderid);
                console.log(cartTotal)
            }
        } catch (err) {
            console.log(err);
        }
    },

    // countTotal: async (orderId) => {
    //     try {
    //         const db = req.app.get('db');
    //         console.log(req.session);

    //         cartTotal = await db.getTotal(orderId);
    //             console.log(cartTotal)
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }
}