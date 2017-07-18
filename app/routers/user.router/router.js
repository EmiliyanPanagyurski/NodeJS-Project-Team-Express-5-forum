const passport = require('passport');

const init = (app, data) => {
    const UserController = require('./controller').init(data);

    app.get('/profile/:id', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('profile');
        } else {
            res.status(404).send('not loged in!');
        }
    });

    app.post('/register', UserController.register);

    app.post('/login', passport.authenticate('local',
        { successRedirect: '/',
          failureRedirect: '/invalid',
          failureFlash: true }),
        function(req, res) {
            res.render('homepage');
        });
};

module.exports = { init };
