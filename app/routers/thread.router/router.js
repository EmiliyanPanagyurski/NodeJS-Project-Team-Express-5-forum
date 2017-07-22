const init = (app, data) => {
    const ThreadController = require('./controller').init(data);

    app.get('/topic/:id', ThreadController.getThreads);

    app.get('/createthread/:id', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('createthread', { id: req.params.id });
        } else {
            res.render('invalid', { notLogedIn: 'you must be loged in!' });
        }
    });

    app.post('/createthread/:id', ThreadController.newThread);
};

module.exports = { init };
