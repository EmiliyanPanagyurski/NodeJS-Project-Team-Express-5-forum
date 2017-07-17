const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const init = (data) => {
    const app = express();

    //  config
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cookieParser());
    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/static', express.static('static'));
    app.use(flash());

    // global var
    app.use( function(req, res, next) {
        res.locals.user = req.user;
        res.locals.authenticated = req.isAuthenticated();
        next();
    });

    //  end config 
    require('./routers').init(app, data);

    return Promise.resolve(app);
};

module.exports = { init };
