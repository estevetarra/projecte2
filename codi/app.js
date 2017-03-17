var express = require('express')
var piblaster = require('pi-blaster.js');

var app = express()
var servo = 0;





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
  if( servo == 0){
    for (servo = 0; servo <= 180; ++servo){
      piblaster.setPwm(21, double(servo)/180);
    }
  } else {
    for (servo = 180; servo >= 180; --servo){
      piblaster.setPwm(21, double(servo)/180);
    }
  }
  consoloe.log ("moviment finalitzat");
  var ret = {};
  ret.status = 0;
  res.json(ret);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
