'use strict';

const rpio=require('rpio');
rpio.init({gpiomem: false});

const pinPWM=12;//initialise le pin
//attention choix du pin entre 12, 32, 33 et 35
const valMax=1024;
const div=64;
//const valeur=v;

rpio.open(pinPWM,rpio.PWM);
rpio.pwmSetClockDivider(div);//valeur (doit etre une puissance de 2) qui divise 19.2MHz ici on a 128 donc 150KHz
rpio.pwmSetRange(pinPWM,valMax);//Valeur max de la largeur de l'impulsion
//rpio.pwmSetData(pinPWM,valeur);//valeur du signal
//rpio.sleep(30);

var Mcp3008 = require('mcp3008.js'),
    adc = new Mcp3008(),
    out = function (value) {
        console.log("Read", value);
        rpio.pwmSetData(pinPWM,value);
    };

adc.read(0, out);
adc.poll(0, 2000, out);
setTimeout(function () { adc.close(); }, 100000);