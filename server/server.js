require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , controller = require('./controller')
    , bodyParser = require('body-parser')
    , stripe = require('stripe')(process.env.SECRET_KEY)
    , port = 3005;


const {
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    CALLBACK_URL
} = process.env;

const app = express();
app.use(bodyParser.json())
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    const db = app.get('db');

    db.findUser([profile.id]).then(userResults => {
        if(!userResults[0]) {
            db.createUser([
                profile.id,
                profile.name.givenName,
                profile.name.familyName
            ]).then(createdUser => {
                db.createOrder(createdUser[0].id)
                return done(null, createdUser[0].id)
            })
        } else {
            return done(null, userResults[0].id)
        }
    })
}))

passport.serializeUser((id, done) => {
    console.log(id, 'id')
    done(null, id);
})
passport.deserializeUser((id, done) => {
    console.log(id, 'deserializerID')
    app.get('db').findSessionUser([id]).then(loggedInUser => {
        console.log('loggedInUser',loggedInUser)
        done(null, loggedInUser[0]);
    })
})



app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}))


app.get('/getUser', controller.getUser);

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(process.env.LOGOUT_REDIRECT);
})


//----STRIPE SETUP POINT----//
app.post('/saveToken', controller.createPayment);

//----SERVICES ENDPOINTS----//
app.get('/services', controller.getServices);

//----PART ENDPOINTS----//
app.get('/parts', controller.getParts);

//----ORDER ENDPOINTS----//
app.post('/order', controller.addCart);
app.get('/order/:id', controller.getOrder);
app.get('/cart/:id', controller.getCartItems);
// app.post('/cartItem', controller.deleteFromCart);
app.delete('/cartItem/:id', controller.deleteFromCart);
app.patch('/total', controller.updateTotal);

//----USER ENDPOINTS----//
app.put('/profile', controller.updateProfile);

app.listen(port, () => {console.log(`Listening on port: ${port}`)});