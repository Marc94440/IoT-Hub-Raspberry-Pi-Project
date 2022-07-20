'use strict';

const Gpio = require('pigpio').Gpio;
const rpio=require('rpio');

//const motor = new Gpio(10, {mode: Gpio.OUTPUT});

const Smotor1 = new Gpio(6, {mode: Gpio.OUTPUT}); //6->Pin 31
const Smotor2 = new Gpio(13, {mode: Gpio.OUTPUT}); //19->Pin 35


let pulseWidth = 1000;
let increment = 500;


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