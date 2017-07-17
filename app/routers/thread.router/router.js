const init = (app, data) => {
    const ThreadController = require('./controller').init(data);

    app.get('/topic/:id', ThreadController.getThreads);

    app.get('/create/:id', (req, res) => {
        res.render('create', { id: req.params.id });
    });

    app.post('/create/:id', ThreadController.newThread);
};

module.exports = { init };
