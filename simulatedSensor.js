/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';
const rpio=require('rpio');
const Gpio = require('pigpio').Gpio;

rpio.init({gpiomem: false});

const Smotor1 = new Gpio(6, {mode: Gpio.OUTPUT});//6->Pin 31
const Smotor2 = new Gpio(19, {mode: Gpio.OUTPUT});//19->Pin 35

let pulseWidth = 1000;
let increment = 500;


setInterval(() => {
  Smotor1.servoWrite(pulseWidth);
  Smotor2.servoWrite(pulseWidth);


  pulseWidth += increment;
  if (pulseWidth >= 1500) {
    increment = -500;
  } else if (pulseWidth <= 1000) {
    increment = 500;
  }
}, 1000);



setInterval(() => {
  pulseWidth=1000;  
  Smotor1.servoWrite(pulseWidth);
  rpio.sleep(1);
  Smotor1.servoWrite(pulseWidth-500);
  rpio.sleep(1);  
  pulseWidth=1000;  
  Smotor2.servoWrite(pulseWidth);
  rpio.sleep(1);
  Smotor2.servoWrite(pulseWidth-500);
  rpio.sleep(1);

  pulseWidth += increment;
  if (pulseWidth >= 1500) {
    increment = -500;
  } else if (pulseWidth <= 1000) {
    increment = 500;
  }
}, 1000);
//rpio.init() sers a modifier les parametre de base de la classe rpio pour l'instance créer ici

const pinIR=8//Initialise le pin
rpio.open(pinIR,rpio.INPUT);
const pinBuzzer=10//Initialise le pin
rpio.open(pinBuzzer,rpio.OUTPUT);
rpio.write(pinBuzzer,rpio.LOW);
const pinPWM1=12;//initialise le pin
//const pinPWM2=33;//initialise le pin

const valMax=1024;
const div=64;
const valeur=1024;

rpio.open(pinPWM1,rpio.PWM);
rpio.pwmSetClockDivider(div);//valeur (doit etre une puissance de 2) qui divise 19.2MHz ici on a 128 donc 150KHz
rpio.pwmSetRange(pinPWM1,valMax);//Valeur max de la largeur de l'impulsion
rpio.pwmSetData(pinPWM1,valeur);//valeur du signal

/*rpio.open(pinPWM2,rpio.PWM);
rpio.pwmSetRange(pinPWM2,valMax);//Valeur max de la largeur de l'impulsion
rpio.pwmSetData(pinPWM2,valeur);//valeur du signal
*/

function Sensor(/* options */) {
  // nothing todo
}

Sensor.prototype.init = function (callback) {
  // nothing todo
  callback();
}

Sensor.prototype.read = function (callback) {
  callback(null, {
    temperature: temp(20, 30),
    humidity: random(60, 80),
    infrared : rpio.read(pinIR),//entier entre 0 et 1
    weight: random(0,1)
  });
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
function temp(min, max) {
  const temps=Math.random() * (max - min) + min;
  if(temps > 28) {
    rpio.sleep(1);//fréquence entre les bips
    rpio.write(pinBuzzer,rpio.HIGH);
    rpio.msleep(300);//durée du bip //msleep est en millisecond et sleep en second
    rpio.write(pinBuzzer,rpio.LOW);
  }
  return temps;
}

module.exports = Sensor;
