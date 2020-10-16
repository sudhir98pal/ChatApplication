const express = require('express');
const http = require('http')
const chalk = require('chalk');
const app = express();
const port = process.env.PORT || 3000
const path = require('path');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);// simply socketio() will not work thus we need socketio(server)
// now our server supports websockets

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath));
server.listen(port, () => {
    console.log(chalk.blueBright("Hi Sudhir Pal"))
    console.log(chalk.greenBright.underline('Sever is Running on port ' + port))
})

let count = 0;
io.on('connection', (socket) => {
    console.log('new websocket connection');
    // socket.emit('countUpdated', count) it emits to single client
    // it emits to every single client connected to this socket

    socket.on('increament', () => {
        
    
        count++;
        console.log('counthasbeen updated! to ' + count);
        io.emit('countUpdated', count)
    })
})