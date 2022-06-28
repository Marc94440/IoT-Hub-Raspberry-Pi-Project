/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';

//const Bme280Sensor = require('./bme280Sensor.js');
const SimulatedSensor = require('./simulatedSensor.js');
const rpio=require('rpio');

const pinPWM=12;//initialise le pin

const valMax=1024;
const div=64;
const valeur=500;


rpio.open(pinPWM,rpio.PWM);
rpio.pwmSetClockDivider(div);//valeur (doit etre une puissance de 2) qui divise 19.2MHz ici on a 128 donc 150KHz
rpio.pwmSetRange(pinPWM,valMax);//Valeur max de la largeur de l'impulsion
rpio.pwmSetData(pinPWM,valeur);


function MessageProcessor(option) {
  option = Object.assign({
    deviceId: '[Unknown device] node',
    temperatureAlert: 30
  }, option);
  this.sensor = new SimulatedSensor() ;
  //this.sensor = option.simulatedData ? new SimulatedSensor() : new Bme280Sensor(option.i2cOption);
  this.deviceId = option.deviceId;
  this.temperatureAlert = option.temperatureAlert
  this.sensor.init(() => {
    this.inited = true;
  });
}

MessageProcessor.prototype.getMessage = function (messageId, cb) {
  if (!this.inited) { return; }
  this.sensor.read((err, data) => {
    if (err) {
      console.log('[Sensor] Read data failed due to:\n\t' + err.message);
      return;
    }

    cb(JSON.stringify({
      messageId: messageId,
      deviceId: this.deviceId,
      temperature: data.temperature,
      humidity: data.humidity,
      infrared : data.infrared,
      weight: data.weight
    }), data.temperature > this.temperatureAlert);
  });
}
rpio.sleep(1);
rpio.pwmSetData(pinPWM,0);

module.exports = MessageProcessor;
