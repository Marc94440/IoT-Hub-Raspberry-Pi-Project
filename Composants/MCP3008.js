// Ce code permet de lire la valeur d'un potentiomètre sur 10 bits (0 à 1023) grace à la puce MCP3008
'use strict';

var Mcp3008 = require('mcp3008.js'),
    adc = new Mcp3008(),
    out = function (value) {
        console.log("Read", value);
    };

adc.read(0, out);
adc.poll(0, 2000, out); //2000 est la fréquence d'échantillonnage en milliseconde 
setTimeout(function () { adc.close(); }, 100000); //100000 est le temps en ms pendant lequel la fonction va tourner
