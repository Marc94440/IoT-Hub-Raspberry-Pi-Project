'use strict';
var sensor = require("node-dht-sensor");
const rpio=require("rpio")
    rpio.sleep(1);
    sensor.read(22, 4, function(err, temperature, humidity) {
            if (!err) {
            console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
            }
    });