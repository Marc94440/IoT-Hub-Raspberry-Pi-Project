/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';

const Capteurs = require('./capteurs.js');

function MessageProcessor(option) {
  option = Object.assign({
    deviceId: '[Unknown device] node',
    temperatureAlert: 30
  }, option);
  this.sensor = new Capteurs() ;
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

module.exports = MessageProcessor;
