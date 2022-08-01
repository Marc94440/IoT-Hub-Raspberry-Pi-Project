/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';

var Mcp3008 = require('mcp3008.js'),
    adc = new Mcp3008(),
    out = function (value) {
        console.log("Read", value);
    };

adc.read(0, out);
adc.poll(0, 2000, out);
setTimeout(function () { adc.close(); }, 100000);
