'use strict';
//Ce code fait bipper un buzzer 100 fois 
const rpio=require('rpio');

const pinBuzzer=10//Initialise le pin

rpio.open(pinBuzzer,rpio.OUTPUT);
for(let i=0;i<100;i++){
  rpio.sleep(1);//fréquence entre les bips
  rpio.write(pinBuzzer,rpio.HIGH);
  rpio.msleep(300);//durée du bip //msleep est en millisecond et sleep en second
  rpio.write(pinBuzzer,rpio.LOW);
}
