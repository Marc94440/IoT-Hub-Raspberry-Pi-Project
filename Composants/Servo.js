'use strict';

const Gpio = require('pigpio').Gpio;
const rpio=require('rpio');

//initialise le pin des 2 moteurs
const Smotor1 = new Gpio(19, {mode: Gpio.OUTPUT}); //19->Pin 35
const Smotor2 = new Gpio(13, {mode: Gpio.OUTPUT}); //13->Pin 33

let pulseWidth = 1000; //position initial du servo
let increment = 500; //valeur de la rotation 


setInterval(() => {
  // Ces 10 lignes permettent au servo d'avoir le bon cycle 
  // cycle : (fermé|fermé -> ouvert|fermé -> fermé|fermé fermé|ouvert -> fermé|fermé )
  pulseWidth=1000;
  Smotor1.servoWrite(pulseWidth);
  rpio.msleep(350);
  Smotor1.servoWrite(pulseWidth-500);
  rpio.msleep(350);
  pulseWidth=1000;
  Smotor2.servoWrite(pulseWidth);
  rpio.msleep(350);
  Smotor2.servoWrite(pulseWidth-500);
  rpio.msleep(350);

  // permet de changer le sens de rotation (increment=500 -> sens horaire et increment=-500 -> sens anti-horaire)
  pulseWidth += increment;
  if (pulseWidth >= 1500) {
    increment = -500;
  } else if (pulseWidth <= 1000) {
    increment = 500;
  }
}, 10); // 10 : temps en ms entre chaque répétition de la fonction