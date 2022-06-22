'use strict';

const rpio=require('rpio');

const pin=8//Initialise le pin

rpio.open(pin,rpio.OUTPUT);
for(let i=0;i<100;i++){
    rpio.msleep(1000);//fréquence entre les bips
    rpio.write(pin,rpio.HIGH);
    rpio.msleep(300);//durée du bip
    rpio.write(pin,rpio.LOW);
}