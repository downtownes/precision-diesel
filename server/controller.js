module.exports = {
    getUser: (req, res, next) => {
        const db = req.app.get('db');

        db.findSessionUser(req.session.passport.user).then(user => {
            if(user) {
                res.status(200).send(user);
            } else { 
                res.status(401).send(alert('Please create and account'));
            }
        })
    }
}