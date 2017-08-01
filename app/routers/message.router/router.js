const init = (app, data) => {
    const messageController = require('./controller').init(data);

    app.post('/message', messageController.sendMessage);

    app.get('/inbox/user/:id', (req, res) => {
        if (req.isAuthenticated()) {
            messageController.getMessages(req, res);
        } else {
            res.render('invalid', { notLogedIn: 'you must be loged in!' });
        }
    });
};

module.exports = { init };
