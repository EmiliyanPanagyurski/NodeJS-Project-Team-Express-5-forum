/* eslint-disable no-console */

const async = () => {
    return Promise.resolve();
};

const config = require('./config');

async()
    .then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        const server = app.listen(config.port, () =>
            console.log(`server running`));
        require('./config/socketio.config').init(server);
    });
