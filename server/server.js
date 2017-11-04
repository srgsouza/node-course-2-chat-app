const path = require('path'); // native node.js module that handles path.
const express = require('express');
const socketIO = require('socket.io'); // enables realtime, bi-directional communication between web clients and servers.
const http = require('http');  // Required to integrate socket io functionality

const {generateMessage, generateLocationMessage} = require('./utils/message');
// console.log(__dirname + '/../public'); // "old" way
// console.log(publicPath);     // using 'path.join()  yields cleaner code
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; // Needed for Heroku - 'process.env' stores the environment variables/values
var app = express();
var server = http.createServer(app);  // (note: http is used behind the scenes to integrate 'express')
var io = socketIO(server);

// // This middleware will server the maintenance page and stop all other requests - note the absense of next()
// // Uncomment when site is under maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

// Middleware that serves static files - __dirname gets the program directory
app.use(express.static(publicPath));  // 'app.use' is how we register a middleware. It takes a function


io.on('connection', (socket) => { // register an event listener. requires a callback function
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // listens for a message from the client 'createMessage' - index.js has an emit function for it
  socket.on('createMessage', (message, callback) => {  // callback is used for acknowledgments - ie. send error msg back to the client
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  // listens for the geolocation message coming from the client
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitute, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
