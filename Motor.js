'use strict';

'use strict';

const rpio=require('rpio');
const pinPWM=12;//initialise le pin
//attention choix du pin entre 12, 32, 33 et 35
const valMax=1024;
const div=64;
const valeur=150;

rpio.open(pinPWM,rpio.PWM);
rpio.pwmSetClockDivider(div);//valeur (doit etre une puissance de 2) qui divise 19.2MHz ici on a 128 donc 150KHz
rpio.pwmSetRange(pinPWM,valMax);//Valeur max de la largeur de l'impulsion
rpio.pwmSetData(pinPWM,valeur);//valeur du signal

rpio.sleep(3);

/*const rpio=require('rpio');

const pinH=7;
const pinL=8;

rpio.open(pinH,rpio.OUTPUT);
rpio.open(pinL,rpio.OUTPUT);


rpio.write(pinH,rpio.HIGH);
rpio.write(pinL,rpio.LOW);
rpio.sleep(3);

rpio.write(pinH,rpio.LOW);
rpio.write(pinL,rpio.LOW);
rpio.sleep(3);*/
