//Ce programme permet d'avoir un poids en g ou mg grace au HX711 et à la cellule de charge
'use strict';
const HX711 = require('./hx711');
const loadCell = new HX711(6, 5, { //initialise les pins , 6=clk pin 5=datapin ( 5 : pin 29 et 6 : pin 31)
  continous: 30,
  offset : 8300964 //A tester (permet de faire le zero) pour calibrer la balance
});

setInterval(async () => {
  console.log(loadCell.getLast()/1000); //on divise pas 1000 pour convertir mg en g et Math.round() arrondit à l'unité
}, 1000); //fréquence d'échantillonnage