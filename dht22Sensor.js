/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';

const DHT22 = require('dht');

const dataPin=5;
const dhtType=22;

const Sensor=dht(dataPin, dhtType);
setInterval(() => { 
  sensor.read();
}, 2500); // the sensor can only be red every 2 seconds

sensor.on('result', data => {
  console.log(`temp: 20°c`); 
  console.log(`rhum: 50%`); 
});

sensor.on('badChecksum', () => {
  console.log('checksum failed');
});

/*
// The DHT22 constructor options are optional.
const DEFAULT_OPTIONS = {
  i2cBusNo: 1, // defaults to 1
  i2cAddress: DHT22.DHT22_DEFAULT_I2C_ADDRESS() // defaults to 0x77
};

function Sensor(options) {
  options = Object.assign(DEFAULT_OPTIONS, options || {});
  this.dht22 = new DHT22(options);
}

Sensor.prototype.init = function (callback) {
  this.dht22.init()
    .then(callback)
    .catch((err) => {
      console.error(err);
    });
}

Sensor.prototype.read = function (callback) {
  this.dht22.readSensorData()
    .then((data) => {
      data.temperature = data.temperature_C;
      callback(null, data);
    })
    .catch(callback);
}*/

module.exports = Sensor;
