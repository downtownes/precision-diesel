module.exports = {
    getUser: (req, res, next) => {
        const db = req.app.get('db');
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

    newOrder: async (req, res, next) => {
        try{
        const db = req.app.get('db');
        console.log('req.body',req.body)

        order = await db.getOrder(req.body.id)
            console.log('order',order);
            if(!order[0]) {
                const newOrder = await db.createOrder(req.body.id);
                console.log(newOrder);
                const addToCart = await db.addToCart(newOrder.orderId, req.body.prodId, req.body.qty)
            } else {
                const addToCart = await db.addToCart(req.body.id, order[0].orderid, req.body.prodId, req.body.qty)
            }
        }catch (err) {
            console.log(err);
        }
    },
    
    countTotal: (orderId) => {
        const db = req.app.get('db');

        db.getTotal()
    }
}