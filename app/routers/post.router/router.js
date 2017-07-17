const init = (app, data) => {
    const PostController = require('./controller').init(data);

    app.get('/threadpage/:id', PostController.getPosts);
    
    app.get('/create/:id', (req, res) => {
        res.render('create', { id: req.params.id });
    });

    app.post('/create/:id', PostController.newPost);
};

module.exports = { init };
