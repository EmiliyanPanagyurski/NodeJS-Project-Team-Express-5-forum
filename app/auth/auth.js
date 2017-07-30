const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');

const init = (app, data) => {
    const UserData = data.users;

    passport.use(new LocalStrategy(
        function(username, password, done) {
            UserData.filterBy({ username: username })
                .then((user) => {
                    if (user.length === 0) {
                        return done(null, false, { message: 'Unknown User' });
                    }

                    return UserData.comparePasswords(bcrypt, password, user[0].password,
                        function(Match) {
                            if (Match) {
                                return done(null, user);
                            }

                            return done(null, false,
                                { message: 'Invalid password' });
                    });
                });
    }));

    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user[0]._id);
    });

    passport.deserializeUser(function(id, done) {
        UserData.filterBy({ _id: new ObjectId(id) })
            .then((user) => {
                done(null, user);
            });
    });
};

module.exports = { init };
