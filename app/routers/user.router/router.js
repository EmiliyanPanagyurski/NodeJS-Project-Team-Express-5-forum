const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = (app, data) => {
    const UserController = require('./controller').init(data);
    const userData = data.users;

    passport.use(new LocalStrategy(
        function(username, password, done) {
            userData.filterBy({ username: username })
                .then((user) => {
                    if (user.length === 0) {
                        return done(null, false, { message: 'Unknown User' });
                    }

                    return userData.comparePasswords(password, user[0].password, function(Match) {
                        if (Match) {
                            return done(null, user);
                        }

                        return done(null, false, { message: 'Invalid password' });
                    });
                });
        }));

    passport.serializeUser(function(user, done) {
        done(null, user[0]._id);
    });

    passport.deserializeUser(function(id, done) {
        userData.filterBy({ id: id })
            .then((user) => {
                done(null, user);
            });
        });

    app.post('/register', UserController.register);

    app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/invalid', failureFlash: true }),
        function(req, res) {
            res.redirect('/');
        });
};

module.exports = { init };
