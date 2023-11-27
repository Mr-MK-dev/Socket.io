const app = require('./index');
require('dotenv').config({});
const port = process.env.PORT || 3000;
const Filter = require('bad-words');
const http = require('http');
const server = http.createServer(app);

//SocketIo
const socket = require('socket.io');
const io = socket(server);

// Emit for client --> server = increment
// Emit for server --> client = countUpdated

io.on('connection', (socket) => {
    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'new user is connected!');

    socket.on('sendLocation', (location, callback) => {
        io.emit('message', location);
        callback('Location Shared');
    });

    socket.on('sendMessage', (msg, callback) => {
        const fitler = new Filter();
        if (fitler.isProfane(msg)) {
            return callback('Profanity is not allowed');
        }
        io.emit('message', msg);
        callback('Deliverd');
    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user is left');
    });
});

server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
