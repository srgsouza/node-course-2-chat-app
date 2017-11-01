
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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Client Frank',
//   text: 'Hi'
// }, function (data) {  // 'data' comes from the callback function in server.js
//   console.log('Got it (Generated in the client and emitted to server', data);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
