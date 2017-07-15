const init = (app, data) => {
    require('./user.router').init(app, data);

    app.get('/', (req, res) => {
        res.render('homepage');
    });

    app.get('/register', (req, res) => {
        res.render('register');
    });

     app.get('/login', (req, res) => {
        res.render('login');
    });
};

module.exports = { init };
