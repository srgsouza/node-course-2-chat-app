
// socket.io enables realtime, bi-directional communication between web clients and servers.

var socket = io();


socket.on('connect', function () {  // connect is a built-in listener
  console.log('Connected to Server');

  // emits the 'createEmail' event - server.js has a listener for it
  socket.emit('createMessage', {
    from: 'sergio',
    text: 'Hi all. this is what I typed in my chat box'
  });

});

socket.on('disconnect', function () { // disconnect is a built-in listener
  console.log('Disconnected from Server');
});

socket.on('newMessage', function (message) { // listening for new messages from the server
  console.log('New Message', message);
});
