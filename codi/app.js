﻿var express = require('express');
var ipaddr = require('ipaddr.js');
var piblaster = require('pi-blaster.js');
var useragent = require('useragent');


var app = express();
var servo_pos = 0;
var data=[];

function getIp(text) {
  if (ipaddr.IPv4.isValid(text)){
    return text;
  }
  else if (ipaddr.IPv6.isValid(text)){
    var ip = ipaddr.IPv6.parse(text);
    if (ip.isIPv4MappedAddress()){
      return ip.toIPv4Address().toString();
    }
    else return text;
  }
  else return "IP not valid";
}

//making files in public served at /
app.use(express.static('public'));

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
});


app.post('/getRecord', function (req, res) {
    var ret={};
    ret.status=0;
    ret.Data=[];

    var timeNow=Date.now();

    data.forEach(function(e){
        var e2=e;
        e2.Time=timeNow-e2.Time;
        ret.Data.unshift(e2);
    });

    res.json(ret);
    return ret;
});


app.post('/openDoor', function (req, res) {

  var dataObj={};

  dataObj.Time=Date.now();
  console.log(dataObj.Time);


  function move_pos(pos){
      var servo_pwm=servo_pos*0.2/180;
      piblaster.setPwm(21,servo_pwm);
      console.log ("pwm",servo_pwm);
      console.log ("posicio",servo_pos);
  }

  var servo_pwm=[0.088,0.05];
  piblaster.setPwm(21,servo_pwm[0],function(){
  	setTimeout(function(){
  	    piblaster.setPwm(21,servo_pwm[1],function(){});
  	},1500);
  });
  var ret = {};
  console.log(getIp(req.connection.remoteAddress));
  var agent = useragent.parse(req.headers['user-agent']);
  console.log(JSON.stringify(agent));
  if (agent.device.family=="Other"){
    dataObj.DeviceType="PC";
  }
  else{
    dataObj.DeviceType="Mobile";
  }

  dataObj.Family=agent.os.family;
  if (dataObj.Family=="Ubuntu" || dataObj.Family=="Linux"){
      dataObj.Family="linux";
  }
  else if (dataObj.Family.contains("Windows")){
      dataObj.Family="windows";
  }
  else if (dataObj.Family=="Android"){
      dataObj.Family="android";
  }

  data.push(dataObj);
  console.log(JSON.stringify(dataObj));
  ret.status = 0;
  res.json(ret);
  return ret;
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
