'use strict';

const rpio=require('rpio');

const pinIR=8//Initialise le pin

rpio.open(pinIR,rpio.INPUT);
for(let i=0;i<100;i++){
    rpio.sleep(1);//temps d'échantillonnage
    console.log(rpio.read(pinIR));
}