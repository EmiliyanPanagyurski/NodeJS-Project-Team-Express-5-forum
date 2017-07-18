const express = require('express');

const init = (data) => {
    const app = express();

    //  config
    require('./config').init(app, data);
    require('./auth').init(app, data);

    app.use('/static', express.static('static'));

    // global var
    app.use( function(req, res, next) {
        res.locals.user = req.user;
        res.locals.authenticated = req.isAuthenticated();
        next();
    });

    require('./routers').init(app, data);

    return Promise.resolve(app);
};

module.exports = { init };
