const passport = require('passport');

const init = (app, data) => {
    const UserController = require('./controller').init(data);

    app.get('/profile/:id', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('profile', { user: req.user });
        } else {
            res.status(404).send('not loged in!');
        }
    });

    app.get('/profile/user/:id', UserController.getPublicProfile);

    app.post('/register', UserController.register);

    app.post('/profile/:id', UserController.updateProfile);

    app.post('/login', passport.authenticate('local',
        { successRedirect: '/',
          failureRedirect: '/invalid',
          failureFlash: true }),
        function(req, res) {
            res.render('homepage');
        });
};

module.exports = { init };
