const init = (app, data) => {
    require('./user.router/').init(app, data);
    require('./thread.router').init(app, data);
    require('./post.router').init(app, data);

    app.get('/', (req, res) => {
        console.log(req.session.user);
        res.render('homepage');
    });

    app.get('/register', (req, res) => {
        res.render('register');
    });

     app.get('/login', (req, res) => {
        res.render('login');
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/invalid', (req, res) => {
        res.render('invalid');
    });
};

module.exports = { init };
