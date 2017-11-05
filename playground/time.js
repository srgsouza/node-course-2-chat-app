// Jan 1st 1970 00:00:00 am  has value 0 (time)


var moment = require('moment');  // The goto time library. Essential whenever using time, timestamps, dates etc.

var date = moment();
date.add(1, 'years').subtract(1, 'months');
console.log(date.format('MMM Do,   YYYY'));


// print the following:
// 10:35 am
// 6:01 am

// console.log(date.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var cdate = moment(createdAt);

console.log(date.format('h:mm a'));
