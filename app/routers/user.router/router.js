const passport = require('passport');
const multer = require('multer');

const init = (app, data) => {
    const UserController = require('./controller').init(data);

    const Storage = require('./imgUploaderConfig').init();
    const upload = multer({ storage: Storage });

    app.get('/profile/:id', (req, res) => {
        if (req.isAuthenticated()) {
            // id's must be equeall for loged in user and :id
            res.render('profile', { user: req.user });
        } else {
            res.status(404).send('not loged in!');
        }
    });

    app.get('/profile/user/:id', UserController.getPublicProfile);

    app.post('/register', UserController.register);

    app.post('/profile/:id/update', UserController.updateProfile);

    app.post('/login', passport.authenticate('local',
        { successRedirect: '/',
          failureRedirect: '/invalid',
          failureFlash: true }),
        function(req, res) {
            res.render('homepage');
        });

    app.post('/profile/img',
        upload.single('imgUploader'),
        UserController.updateProfileImage);
};

module.exports = { init };
