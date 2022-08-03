'use strict';
//Ce code renvoie un booléen 0 si rien ne passe entre les capteur et 1 si quelque chose passe
const rpio=require('rpio');

const pinIR=8//Initialise le pin

rpio.open(pinIR,rpio.INPUT);
for(let i=0;i<100;i++){
  rpio.sleep(1);//temps d'échantillonnage
  console.log(rpio.read(pinIR));
}

/*Code pour hc-sr04

'use strict';

const Gpio = require('../').Gpio;

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
const MICROSECDONDS_PER_CM = 1e6/34321;

const trigger = new Gpio(23, {mode: Gpio.OUTPUT});
const echo = new Gpio(24, {mode: Gpio.INPUT, alert: true});

trigger.digitalWrite(0); // Make sure trigger is low

const watchHCSR04 = () => {
  let startTick;

  echo.on('alert', (level, tick) => {
    if (level === 1) {
      startTick = tick;
    } else {
      const endTick = tick;
      const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
      console.log(diff / 2 / MICROSECDONDS_PER_CM);
    }
  });
};

watchHCSR04();

// Trigger a distance measurement once per second
setInterval(() => {
  trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);
 */

