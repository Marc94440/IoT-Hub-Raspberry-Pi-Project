// Ce code est un module pour le capteur de poids HX711 nécessaire pour le faire marcher la balance 
const { Gpio } = require('pigpio');

class HX711 {
  constructor(clockPin, dataPin, options) {
    this.options = {
      scale: 1,
      offset: 0,
      continous: false,
      ...options,
    }

    this.dataPin = new Gpio(dataPin, {mode: Gpio.INPUT});
    this.clockPin = new Gpio(clockPin, {mode: Gpio.OUTPUT, pullUpDown: Gpio.PUD_DOWN});

    // Start loop if desired
    this.continous = this.options.continous;
  }

  async readRaw(times = 1) {
    let sum = 0;

    for(let x = 0; x < times; x++) {
      let value = 0;

      // SCK is made LL
      this.clockPin.digitalWrite(0);

      // Wait until Data Line goes LOW
      await new Promise((resolve, reject) => {
        setImmediate(() => {
          if(this.dataPin.digitalRead() === 0) {
            resolve();
          }
        })
      });

      const buff = [];

      // Read 24-bit data from HX711
      for (let i = 0; i < 24; i++)
      {
        //generate CLK pulse
        this.clock();

        // Shift in the current bit
        value = value << 1;
        value += this.dataPin.digitalRead();
      }

      //generate CLK pulse
      this.clock();

      value = value ^ 0x800000;

      sum += value;
    }

    this.lastRead = sum / times;

    return sum / times;
  }

  async readOffset(times = 1) {
    let value = await this.readRaw(times);
    value -= this.offset;
    return value;
  }

  async read(times = 1) {
    let value = await this.readRaw(times);
    value -= this.offset;
    value *= this.scale;
    return value;
  }

  getLastRaw() {
    return this.lastRead;
  }

  getLastOffset() {
    let value = this.lastRead;
    value -= this.offset;
    return value;
  }

  getLast() {
    let value = this.lastRead;
    value -= this.offset;
    value *= this.scale;
    return value;
  }

  async tare(times = 1) {
    this.offset = await this.readRaw(times);
  }

  set scale(scale) {
    this.options.scale = scale;
  }

  get scale() {
    if(typeof this.options.scale === 'function') {
      return this.options.scale();
    }
    return this.options.scale;
  }

  set offset(offset) {
    this.options.offset = offset;
  }

  get offset() {
    if(typeof this.options.offset === 'function') {
      return this.options.offset();
    }
    return this.options.offset;
  }

  set continous(delay) {
    this.options.continous = delay;
    clearInterval(this.loop);

    if(this.options.continous && Number.isNaN(this.options.continous) === false) {
      // Get immediate first reading
      this.readRaw();

      // Setup loop at desired rate
      this.loop = setInterval(() => {
        this.readRaw();
      }, this.options.continous);
    }
  }

  clock() {
    this.clockPin.digitalWrite(1);
    this.clockPin.digitalWrite(0);
  }
}

module.exports = HX711;
