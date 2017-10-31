const path = require('path'); // native node.js module that handles path.
const express = require('express');
const socketIO = require('socket.io');
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

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
}); // register an event listener

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
