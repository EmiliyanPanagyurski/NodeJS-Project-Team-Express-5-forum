const init = (app, data) => {
    const ThreadController = require('./controller').init(data);

    app.get('/topic/:id', ThreadController.getThreads);

    app.get('/createthread/:id', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('createthread', { id: req.params.id });
        } else {
            res.status(404).send('not loged in!');
        }
    });

    app.post('/createthread/:id', ThreadController.newThread);
};

module.exports = { init };
