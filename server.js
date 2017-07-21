/* eslint-disable no-console */

const async = () => {
    return Promise.resolve();
};

const config = require('./config');
const socket = require('socket.io');

async()
    .then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        const server = app.listen(config.port, () =>
            console.log(`server running`));

        const io = socket(server);

        io.on('connection', function(socket) {
            console.log('made socket connection');

            socket.on('chat', function(data) {
                io.sockets.emit('chat', data);
            });
        });
    });
