'use strict';

const rpio=require('rpio');

const pinPWM=12;//initialise le pin
//attention choix du pin entre 12, 32, 33 et 35
const valMax=1024;
const div=128;
const valeur=512;

rpio.open(pinPWM,rpio.PWM);
rpio.pwmSetClockDivider(div);//valeur (doit etre une puissance de 2) qui divise 19.2MHz ici on a 128 donc 150KHz
rpio.pwmSetRange(pinPWM,valMax);//Valeur max de la largeur de l'impulsion
rpio.pwmSetData(pinPWM,valeur);//valeur du signal
