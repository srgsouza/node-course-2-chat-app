
// socket.io enables realtime, bi-directional communication between web clients and servers.

var socket = io();


socket.on('connect', function () {  // connect is a built-in listener
  console.log('Connected to Server');
});

socket.on('disconnect', function () { // disconnect is a built-in listener
  console.log('from index.js - Disconnected from Server');
});

socket.on('newMessage', function (message) { // listening for new messages from the server
  console.log('from index.js - New Message: ', message);
});
