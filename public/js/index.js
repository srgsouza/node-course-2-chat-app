
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

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
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

// listenerefor the send-location button
var locationButton = jQuery('#send-location');
locationButton.on('click', function () { // same as jQuery('#send-location').on
  if (!navigator.geolocation) {  // checks if user browser has access to the geolocation function
    return alert('Geolocation not supported by your browser.'); // return alert if browser has no support/access
  }

  navigator.geolocation.getCurrentPosition(function (position) {  // this executes if browser has access to geolocation function
    socket.emit('createLocationMessage', {  // emits message to server with lat and lng data
      latitute: position.coords.latitude,   // coordinate variables - I used chrome browser dev tool extension to see these variables
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});
