const express = require('express');

const init = (data) => {
    const app = express();

    app.use('/static', express.static('static'));

    //  config
    app.set('view engine', 'pug');

    require('./routers').init(app, data);

    return Promise.resolve(app);
};

module.exports = { init };
