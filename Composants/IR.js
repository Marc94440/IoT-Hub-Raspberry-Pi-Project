'use strict';
//Ce code renvoie un booléen 0 si rien ne passe entre les capteur et 1 si quelque chose passe
const rpio=require('rpio');

const pinIR=8//Initialise le pin

rpio.open(pinIR,rpio.INPUT);
for(let i=0;i<100;i++){
  rpio.sleep(1);//temps d'échantillonnage
  console.log(rpio.read(pinIR)); //affiche 1 ou 0
}
