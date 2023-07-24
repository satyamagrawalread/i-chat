// Node Server which will handle socket io connections

const express = require('express');
const app = express();
const path = require('path');

const http = require('http').Server(app);

const port = process.env.PORT || 8000;

//attached http server to the socket.io
const io = require('socket.io')(http);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../")));



//route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})


const users = {};

io.on('connection', socket => {
    console.log('A user connected');
    socket.on('new-user-joined', name => {
        console.log('New User:', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    socket.on('disconnecting', () => {
        console.log('A user disconnected');
        socket.broadcast.emit('user-left', users[socket.id]);
    })
})

http.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
