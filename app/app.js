const express = require('express');

const init = (data) => {
    const app = express();

    app.use('/static', express.static('static'));

    //  config
    app.set('view engine', 'pug');

    //  routing
    app.get('/', (req, res) => {
        res.render('homepage');
    });

    app.get('/topicpage', (req, res) => {
        res.render('topicpage');
    });

     app.get('/threadpage', (req, res) => {
        res.render('threadpage');
    });

      app.get('/login', (req, res) => {
        res.send('login modal is not finished yet');
    });

      app.get('/register', (req, res) => {
        res.send('register modal is not finished yet');
    });

    return Promise.resolve(app);
};

module.exports = { init };
