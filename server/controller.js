
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
        try {
            const db = req.app.get('db');
            let priceTotal = [];
            let orderID;
            let listOfPrices = [];

            order = await db.getOrder(req.body.id)
            if (!order[0]) {
                const newOrder = await db.createOrder(req.body.id);
                orderID = newOrder.orderId;
                const addToCart = await db.addToCart(newOrder.orderId, newOrder.orderId, req.body.prodId, req.body.qty)
            } else {
                const addToCart = await db.addToCart(order[0].orderid, order[0].orderid, req.body.productId, req.body.qty)
                orderID = order[0].orderid
            }
            countTotal = await db.getTotal(orderID);
            countTotal = await countTotal.map((val, i) => {
                listOfPrices.push(val.price * val.quantity)
            })
            listOfPrices = await listOfPrices.reduce((total, val) => {
                return parseInt(val + total);
            })
            // res.sendStatus(listOfPrices);
        } catch (err) {
            console.log(err);
        }
    },

    // countTotal: (orderId) => {
    //     const db = req.app.get('db');
    //     let listOfPrices = [];
    //     console.log(req.session);

    //     cartTotal = db.getTotal(orderId);
    //     console.log(cartTotal)
    //     cartTotal = cartTotal.map((val, i) => {
    //         listOfPrices.push(val.price * val.quantity)
    //     })
    //     listOfPrices.reduce((total, val) => {
    //         listOfPrices = total + val;
    //     })
    //     console.log(listOfPrices);
    // }
}