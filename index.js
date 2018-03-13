const Relay = require("sainsmart-16-hid");
var Service, Characteristic, relays;

class Sainsmart16USBRelay {
  constructor(log, config) {
    this.log = log;
    this.name = config["name"];
    this.index = config["relay"];
    this.service = new Service.Switch(this.name || "Relay " + this.index);
    this.service
      .getCharacteristic(Characteristic.On)
      .on("get", this.get.bind(this))
      .on("set", this.set.bind(this));
  }

	getServices() {
		return [this.service];
	}

  set(value, callback) {
    this.log("Set Relay " + this.index + " -> " + value);
    relays.set(this.index, value);
    callback();
  }

  get(callback) {
    const value = relays.stateArray[this.index];
    // this.log("Get Relay " + this.index + " -> " + value);
    callback(null, value);
  }
}

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  relays = new Relay();
  homebridge.registerAccessory(
    "homebridge-sainsmart-16-usb",
    "Sainsmart16USBRelay",
    Sainsmart16USBRelay
  );
};
