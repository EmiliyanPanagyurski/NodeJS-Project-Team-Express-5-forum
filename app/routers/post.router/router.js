const init = (app, data) => {
    const PostController = require('./controller').init(data);

    app.get('/threadpage/:id', PostController.getPosts);

     app.get('/createpost/:id', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('createpost', { id: req.params.id });
        } else {
            res.render('invalid', { notLogedIn: 'you must be loged in!' });
        }
    });

    app.post('/createpost/:id', PostController.newPost);
};

module.exports = { init };
