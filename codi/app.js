var express = require('express')
var piblaster = require('pi-blaster.js');
var piservo = require('pi-servo')
var servo = new piservo(21) 

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
      servo_pos=180;
    
  } else {
    //for (servo_pos = 180; servo_pos > 0; servo-=10){
      servo_pos=0;   
  }
  servo.open().then(function (){
    servo.setDegree(servo_pos)	
  })  
  console.log ("moviment finalitzat",servo);
  var ret = {};
  ret.status = 0;
  res.json(ret);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
