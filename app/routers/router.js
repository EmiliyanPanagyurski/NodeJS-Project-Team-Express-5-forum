const init = (app, data) => {
    require('./user.router').init(data);

    app.get('./', (req, res) => {
        res.render('homepage');
    });
};

module.exports = { init };
