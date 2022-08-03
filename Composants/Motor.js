'use strict';

const rpio=require('rpio');
rpio.init({gpiomem: false});

const pinPWM1=12;//initialise le pin
const pinPWM2=32;//initialise le pin
//attention choix du pin entre 12, 32, 33 et 35
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
        console.log("Read", value);
        rpio.pwmSetData(pinPWM1,value);
        rpio.pwmSetData(pinPWM2,value);

    };

adc.read(0, out);
adc.poll(0, 10, out);
setTimeout(function () { adc.close(); }, 100000);