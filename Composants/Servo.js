'use strict';

const Gpio = require('pigpio').Gpio;
const rpio=require('rpio');

//const motor = new Gpio(10, {mode: Gpio.OUTPUT});

const Smotor1 = new Gpio(19, {mode: Gpio.OUTPUT}); //19->Pin 35
const Smotor2 = new Gpio(13, {mode: Gpio.OUTPUT}); //13->Pin 33


let pulseWidth = 1000;
let increment = 500;


setInterval(() => {
  pulseWidth=1000;
  Smotor1.servoWrite(pulseWidth);
  rpio.msleep(250);
  Smotor1.servoWrite(pulseWidth-500);
  rpio.msleep(250);
  pulseWidth=1000;
  Smotor2.servoWrite(pulseWidth);
  rpio.msleep(250);
  Smotor2.servoWrite(pulseWidth-500);
  rpio.msleep(250);

  pulseWidth += increment;
  if (pulseWidth >= 1500) {
    increment = -500;
  } else if (pulseWidth <= 1000) {
    increment = 500;
  }
}, 10);