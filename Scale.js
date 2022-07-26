'use strict';
const HX711 = require('./hx711');
const loadCell = new HX711(6, 5, { //6=clk pin 5=datapin
  continous: 30,
  offset : 8300964 //, //A tester (permet de faire le zero)
});

setInterval(async () => {
  console.log(Math.round(loadCell.getLast()/1000)); //on divise pas 1000 pour convertir mg en g et Math.round() arrondit à l'unité
}, 1000);