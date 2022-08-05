//Cette fonction permet de faire tourner 2 moteurs à une vitesse réguler grace à un potentiomètre et une carte MCP3008
'use strict';

const rpio=require('rpio');
rpio.init({gpiomem: false});

const pinPWM1=12;//initialise le pin du moteur 1
const pinPWM2=32;//initialise le pin du moteur 2

//attention choix du pin entre 12, 32, 33 et 35

const valMax=1024; // Valeur max du signal PWM 
const div=4; //valeur (doit etre une puissance de 2) qui divise 19.2MHz

rpio.open(pinPWM1,rpio.PWM);//Initialise le pin en PWM
rpio.pwmSetClockDivider(div);//valeur (doit etre une puissance de 2) qui divise 19.2MHz (Ex : pour 128 la fréquence du signal PWM est de 150KHz)
rpio.pwmSetRange(pinPWM1,valMax);//Valeur max de la largeur de l'impulsion
rpio.pwmSetData(pinPWM1,0);//valeur du signal

rpio.open(pinPWM2,rpio.PWM);//Initialise le pin en PWM
rpio.pwmSetRange(pinPWM2,valMax);//Valeur max de la largeur de l'impulsion
rpio.pwmSetData(pinPWM2,0);//valeur du signal

var Mcp3008 = require('mcp3008.js'),
    adc = new Mcp3008(),
    out = function (value) {
        console.log("Read", value);
        rpio.pwmSetData(pinPWM1,value);//modifie la valeur du PWM suivant la valeur du potentiomètre
        rpio.pwmSetData(pinPWM2,value);//pareil

    };

adc.read(0, out);
adc.poll(0, 10, out);//10 -> fréquence d'échantillonnage en ms 
setTimeout(function () { adc.close(); }, 100000); //100000 -> temps d'exécution du programme en ms