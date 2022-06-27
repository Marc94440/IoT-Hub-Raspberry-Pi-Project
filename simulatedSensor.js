/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';
const rpio=require('rpio');

const pin=8//Initialise le pin
rpio.open(pin,rpio.INPUT);
const pinBuzzer=10//Initialise le pin
rpio.open(pinBuzzer,rpio.OUTPUT);
const pinPWM=12;//initialise le pin

const valMax=1024;
const div=64;
const valeur=150;

const temp=random(20, 30);

rpio.open(pinPWM,rpio.PWM);
rpio.pwmSetClockDivider(div);//valeur (doit etre une puissance de 2) qui divise 19.2MHz ici on a 128 donc 150KHz
rpio.pwmSetRange(pinPWM,valMax);//Valeur max de la largeur de l'impulsion
rpio.pwmSetData(pinPWM,valeur);

function Sensor(/* options */) {
  // nothing todo
}

Sensor.prototype.init = function (callback) {
  // nothing todo
  callback();
}

Sensor.prototype.read = function (callback) {
  callback(null, {
    temperature: temp,
    humidity: random(60, 80),
    infrared : rpio.read(pin),//entier entre 0 et 1
    weight: random(0,1)
  });
  if(temp > 28) {
    for(let i=0;i<100;i++){
      rpio.sleep(1);//fréquence entre les bips
      rpio.write(pinBuzzer,rpio.HIGH);
      rpio.msleep(300);//durée du bip //msleep est en millisecond et sleep en second
      rpio.write(pinBuzzer,rpio.LOW);
    }
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = Sensor;
