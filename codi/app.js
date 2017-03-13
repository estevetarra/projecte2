var express = require('express')
var piblaster = require('pi-blaster.js');
var openalpr = require ("node-openalpr");

var app = express()
var led = 0;

openalpr.Start ();
console.log(openalpr.GetVersion ());


//making files in public served at /
app.use(express.static('public'))

app.get('/', function (req, res) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile("index.html", options, function (err) {
   if (err) {
     next(err);
   } else {
     console.log('Sent:', "index.html");
   }
 });
})

app.post('/openDoor', function (req, res) {
  console.log('Esteve es un geni')
  led = 1 - led;
  piblaster.setPwm(21, led );
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
