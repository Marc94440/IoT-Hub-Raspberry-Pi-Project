'use strict';
//Ce code fait bipper un buzzer 100 fois 

const rpio=require('rpio');

const pinBuzzer=10//Initialise le pin 

rpio.open(pinBuzzer,rpio.OUTPUT); // ouvre le pin 10 en sortie
for(let i=0;i<100;i++){
  rpio.sleep(1);//fréquence entre les bips
  rpio.write(pinBuzzer,rpio.HIGH);  //signal haut (3,3V) faisant produire du son au buzzer
  rpio.msleep(300);//durée du bip , msleep est en millisecond et sleep en second
  rpio.write(pinBuzzer,rpio.LOW); //signal bas (0V) aucun bruit ne sors du buzzer
}
