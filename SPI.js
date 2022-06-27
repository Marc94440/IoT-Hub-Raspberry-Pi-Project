'use strict';

/*
 *  Pin | Function
 * -----|----------
 *   19 |   MOSI
 *   21 |   MISO
 *   23 |   SCLK
 *   24 |   CE0
 *   26 |   CE1
 */

const rpio=require('rpio');
rpio.spiBegin();

/*
 *  Value | Pin
 *  ------|---------------------
 *    0   | SPI_CE0 (24 / GPIO8)
 *    1   | SPI_CE1 (26 / GPIO7)
 *    2   | Both
 */
rpio.spiChipSelect(0);//on va donc utiliser le port 24(BOARD)
//Attention si la puce est active HIGH utiliser rpio.spiSetCSPolarity(0, rpio.HIGH);
rpio.spiSetClockDivider(128); //valeur (doit etre une puissance de 2) qui divise 250MHz ici on a 128 donc 1.95MHz

// revoir a https://www.npmjs.com/package/rpio pour l'explication des Buffer
rpio.spiEnd();
