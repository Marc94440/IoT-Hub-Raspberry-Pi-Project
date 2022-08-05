var sensor = require("node-dht-sensor");
var tempe; //variable servant de memoire permettant de lire la temperature en dehors de la fonction app()
var hum; //pareil que tempe mais pour l'humidité
var app = {
  read: function() {
      var readout = sensor.read(
       22,
       4
      );
        tempe = readout.temperature; //enregistre la valeur de température dans la variable tempe
        hum = readout.humidity; //pareil mais avec l'humidité et la variable hum
  }
};

app.read(); //appele la fonction app
console.log(hum,"  ",tempe); //affiche dans la console la valeur de température et d'humidité 