var express = require('express')
var piblaster = require('pi-blaster.js');


var app = express()
var servo_pos = 0;





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
  if( servo_pos < 90){
    //for (servo_pos = 0; servo_pos < 180; servo_pos+=10){
      servo_pos=160;
    
  } else {
    //for (servo_pos = 180; servo_pos > 0; servo_pos-=10){
      servo_pos=20;   
  }
  var servo_pwm=servo_pos*0.2/180;
  piblaster.setPwm(21,servo_pwm);
  console.log(servo_pwm);
  console.log ("moviment finalitzat",servo_pos);
  var ret = {};
  ret.status = 0;
  res.json(ret);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
