const express = require('express');

const init = (data) => {
    const app = express();

    //  config
    app.set('view engine', 'pug');

    //  routing
    app.get('/', (req, res) => {
        res.render('homepage');
    });

    return Promise.resolve(app);
};

module.exports = {init};
