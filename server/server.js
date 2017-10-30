const express = require('express');

const path = require('path'); // native node.js module that handles path.
// console.log(__dirname + '/../public'); // "old" way
// console.log(publicPath);     // using 'path.join()  yields cleaner code
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; // Needed for Heroku - 'process.env' stores the environment variables/values
var app = express();

// // This middleware will server the maintenance page and stop all other requests - note the absense of next()
// // Uncomment when site is under maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

// Middleware that serves static files - __dirname gets the program directory
app.use(express.static(publicPath));  // 'app.use' is how we register a middleware. It takes a function

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
