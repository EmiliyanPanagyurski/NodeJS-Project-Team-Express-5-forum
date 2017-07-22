const init = (app, data) => {
    const messageController = require('./controller').init(data);

    app.post('/message', messageController.sendMessage);

    app.get('/inbox/user/:id', messageController.getMessages);
};

module.exports = { init };
