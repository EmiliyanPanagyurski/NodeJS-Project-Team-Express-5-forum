const init = (app, data) => {
    require('./user.router/').init(app, data);
    require('./thread.router').init(app, data);
    require('./post.router').init(app, data);
    require('./thread.router/controller').init(data);
    const ThreadsController = require('./thread.router/controller').init(data);

    app.get('/', ThreadsController.getLatestThreads);

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
