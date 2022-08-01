var sensor = require("node-dht-sensor");
var tempe;
var hum;
var app = {
  read: function() {
      var readout = sensor.read(
       22,
       4
      );
        tempe = readout.temperature;
        hum = readout.humidity;
  }
};

app.read();
console.log(hum,"  ",tempe);