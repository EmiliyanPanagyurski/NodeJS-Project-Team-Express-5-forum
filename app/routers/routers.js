const init = (app, data) => {
    require('./user.router/index').init(app, data);

    app.get('/', (req, res) => {
        res.render('homepage');
    });

    app.get('/register', (req, res) => {
        res.render('register');
    });

     app.get('/login', (req, res) => {
        res.render('login');
    });

    app.get('/profile', (req, res) => {
        res.render('profile');
    });

    app.get('/invalid', (req, res) => {
        res.render('invalid');
    });
};

module.exports = { init };
