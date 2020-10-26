const express = require('express');
const http = require('http')
const chalk = require('chalk');
const app = express();
const port = process.env.PORT || 3000
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words')
const { generateMessage } = require('./utils/messages')
const { generateLocationMessage } = require('./utils/location')
// destructuring object
const server = http.createServer(app);
const io = socketio(server);// simply socketio() will not work thus we need socketio(server)
// now our server supports websockets

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath));
server.listen(port, () => {
    console.log(chalk.blueBright("Hi Sudhir Pal"))
    console.log(chalk.greenBright.underline('Sever is Running on port ' + port))
})

io.on('connection', (socket) => {
    console.log('new websocket connection');

    const filter = new Filter(); // to remove bad words
    // broadcast.emit will send message to all client connected to this socket except one who joined recently.

    socket.on('join', ({ userName, chatRoom }) => {

        socket.join(chatRoom);
        console.log(userName);
        console.log(chatRoom);
        socket.emit('message', generateMessage("Welcome "+userName+" !"));
        socket.broadcast.to(chatRoom).emit('message', generateMessage(userName + ' Has Joined !'));

    })
    socket.on('sendMessage', (inputMessage, callback) =>
     {
        filter.addWords('chutiye', 'chutiya', 'mc', 'bc', 'saale');
        io.emit('message', generateMessage(filter.clean(inputMessage)))
        callback('sudhir pal');
    });



    socket.on('disconnect', () => {
        io.emit('message', generateMessage('User left the chat Room'));
    })


    // receiving Geoloaction
    socket.on('shareLocation', (location, callback) => {
        const GoogleMap = 'https://www.google.com/maps?q=';
        callback('Your Location shared !')
        io.emit('sharingLocation', generateLocationMessage(GoogleMap + location.latitude + ',' + location.longitude));
    })




})