/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';
const rpio=require('rpio');
const Gpio = require('pigpio').Gpio;

const HX711 = require('./hx711');
var sensor = require("node-dht-sensor");


rpio.init({gpiomem: false});


const Smotor1 = new Gpio(19, {mode: Gpio.OUTPUT});//6->Pin 31
const Smotor2 = new Gpio(13, {mode: Gpio.OUTPUT});//13->Pin 33

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
//rpio.init() sers a modifier les parametre de base de la classe rpio pour l'instance créer ici

const pinIR=8//Initialise le pin
rpio.open(pinIR,rpio.INPUT);

const pinBuzzer=10//Initialise le pin
rpio.open(pinBuzzer,rpio.OUTPUT);
rpio.write(pinBuzzer,rpio.LOW);

const pinPWM1=12;//initialise le pin
const pinPWM2=32;//initialise le pin

const valMax=1024;
const div=4;


rpio.open(pinPWM1,rpio.PWM);
rpio.pwmSetClockDivider(div);//valeur (doit etre une puissance de 2) qui divise 19.2MHz ici on a 128 donc 150KHz
rpio.pwmSetRange(pinPWM1,valMax);//Valeur max de la largeur de l'impulsion
rpio.pwmSetData(pinPWM1,0);//valeur du signal

rpio.open(pinPWM2,rpio.PWM);
rpio.pwmSetRange(pinPWM2,valMax);//Valeur max de la largeur de l'impulsion
rpio.pwmSetData(pinPWM2,0);//valeur du signal

var Mcp3008 = require('mcp3008.js'),
    adc = new Mcp3008(),
    out = function (value) {
        rpio.pwmSetData(pinPWM1,value);
        rpio.pwmSetData(pinPWM2,value);

    };

adc.read(0, out);
adc.poll(0, 2000, out);
setTimeout(function () { adc.close(); }, 100000);
const loadCell = new HX711(6, 5, { //6=clk pin 5=datapin
  continous: 30,
  offset : 8300964 //, //A tester (permet de faire le zero)
});


var tempe;
var hum;
var app = {
  read: function() {
      var readout = sensor.read(
       22,
       4
      );
        tempe = readout.temperature;
        hum = readout.humidity;
 }
};


function Sensor(/* options */) {
  // nothing todo
}

Sensor.prototype.init = function (callback) {
  // nothing todo
  callback();
}

Sensor.prototype.read = function (callback) {
  app.read();
  callback(null, {
    temperature: tempe, //temp(20, 30),
    humidity: hum , //random(60, 80)
    infrared : rpio.read(pinIR),//entier entre 0 et 1
    weight: Math.round(loadCell.getLast()/1000)//random(0,1)
  });
  Alarme();
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
function Alarme(tempe) {
  if(tempe > 28) {
    rpio.sleep(1);//fréquence entre les bips
    rpio.write(pinBuzzer,rpio.HIGH);
    rpio.msleep(300);//durée du bip //msleep est en millisecond et sleep en second
    rpio.write(pinBuzzer,rpio.LOW);
  }
}

module.exports = Sensor;
