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
  function move_pos(pos){
      var servo_pwm=servo_pos*0.2/180;
      piblaster.setPwm(21,servo_pwm);
      console.log ("pwm",servo_pwm);
      console.log ("posicio",servo_pos);
  }


  var servo_pwm=[0.088,0.05];
  piblaster.setPwm(21,servo_pwm[0]);
  setTimeout(function(){
      piblaster.setPwm(21,servo_pwm[1]);
  });
  var ret = {};
  ret.status = 0;
  res.json(ret);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
