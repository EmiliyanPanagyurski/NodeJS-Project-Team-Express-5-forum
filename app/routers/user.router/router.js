const init = (app, data) => {
    const UserController = require('./controller').init(data);

    app.post('/register', UserController.register);
};

module.exports = { init };
