/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';
const rpio=require('rpio');

const pin=8//Initialise le pin
rpio.open(pin,rpio.INPUT);
function Sensor(/* options */) {
  // nothing todo
}

Sensor.prototype.init = function (callback) {
  // nothing todo
  callback();
}

Sensor.prototype.read = function (callback) {
  callback(null, {
    temperature: random(20, 30),
    humidity: random(60, 80),
    infrared : rpio.read(pin),//entier entre 0 et 1
    weight: random(0,1)
  });
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = Sensor;
