const path = require('path'); // native node.js module that handles path.
const express = require('express');
const socketIO = require('socket.io'); // enables realtime, bi-directional communication between web clients and servers.
const http = require('http');  // Required to integrate socket io functionality


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

  // emits a message to the client - index.js has a listener for it
  socket.emit('newMessage', {
    from: 'sergio',
    text: 'Hey. this is a text from the server',
    createdAt: 123
  });

  // listens for a message from the client 'createMessage' - index.js has an emit function for it
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
