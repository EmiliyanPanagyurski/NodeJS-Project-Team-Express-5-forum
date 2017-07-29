/* eslint-disable no-console */
/* eslint-disable no-shadow */

const socket = require('socket.io');

const init = (server) => {
    const io = socket(server);
        const users = {};
        io.on('connection', function(socket) {
            console.log('made socket connection');

            socket.on('join', function(username) {
                if (Object.values(users).indexOf(username) > -1) {
                    io.sockets.emit('update', users);
                } else {
                    users[socket.id] = username;
                    io.sockets.emit('update', users);
                }
            });

            socket.on('chat', function(data) {
                io.sockets.emit('chat', data);
            });

            socket.on('disconnect', function() {
                delete users[socket.id];
                io.sockets.emit('update', users);
            });
       });
};

module.exports = { init };
