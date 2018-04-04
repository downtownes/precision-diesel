require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , controller = require('./controller')
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
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})

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
                console.log('createdUser', createdUser);
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
    app.get('db').findSessionUser([id]).then(loggedInUser => {
        done(null, loggedInUser[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/profile',
    failureRedirect: 'http://localhost:3000/#/'
}))


app.get('/getUser', controller.getUser);

app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3005/');
})




app.listen(port, () => {console.log(`Listening on port: ${port}`)});