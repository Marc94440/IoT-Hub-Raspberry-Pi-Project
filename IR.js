'use strict';

const rpio=require('rpio');

const pin=8//Initialise le pin

rpio.open(pin,rpio.INPUT);
for(let i=0;i<100;i++){
    rpio.msleep(1000);//temps d'échantillonnage
    console.log(rpio.read(pin));
}