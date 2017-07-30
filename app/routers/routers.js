const init = (app, data) => {
    require('./user.router/').init(app, data);
    require('./thread.router').init(app, data);
    require('./post.router').init(app, data);
    require('./thread.router/controller').init(data);
    require('./message.router').init(app, data);
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
        res.redirect(301, '/');
    });

    app.get('/invalid', (req, res) => {
        res.render('invalid');
    });

    app.get('/chatroom', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('chatroom');
        } else {
            res.render('invalid', { notLogedIn: 'you must be loged in!' });
        }
    });
};

module.exports = { init };
