
// socket.io enables realtime, bi-directional communication between web clients and servers.

var socket = io();


socket.on('connect', function () {  // connect is a built-in listener
  console.log('Connected to Server');
});

socket.on('disconnect', function () { // disconnect is a built-in listener
  console.log('from index.js - Disconnected from Server');
});

socket.on('newMessage', function (message) { // listening for new messages from the server
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${formattedTime} - ${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current location</a>');

  li.text(`${formattedTime} - ${message.from}: `);
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

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');  // clears the value of the textbox
  });
});

// listenerefor the send-location button
var locationButton = jQuery('#send-location');
locationButton.on('click', function () { // same as jQuery('#send-location').on
  if (!navigator.geolocation) {  // checks if user browser has access to the geolocation function
    return alert('Geolocation not supported by your browser.'); // return alert if browser has no support/access
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');  // disables the location button after it is clicked (will be re-enabled down bellow)

  navigator.geolocation.getCurrentPosition(function (position) {  // this executes if browser has access to geolocation function
    locationButton.removeAttr('disabled').text('Send location'); // removes the attribute that disabled the location button
    socket.emit('createLocationMessage', {  // emits message to server with lat and lng data
      latitute: position.coords.latitude,   // coordinate variables - I used chrome browser dev tool extension to see these variables
      longitude: position.coords.longitude // removes the attribute that disabled the location button
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
