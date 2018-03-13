const Relay = require("sainsmart-16-hid");
var Accessory, Service, Characteristic, UUIDGen;
const packageName = "homebridge-sainsmart-16-usb";
const platformName = "Sainsmart16USB";

module.exports = function(homebridge) {
  console.log("homebridge API version: " + homebridge.version);

  // Accessory must be created from PlatformAccessory Constructor
  Accessory = homebridge.platformAccessory;

  // Service and Characteristic are from hap-nodejs
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUIDGen = homebridge.hap.uuid;

  homebridge.registerPlatform(packageName, platformName, RelayBoard, false);
};

class RelayBoard {
  constructor(log, config, api) {
    log("Sainsmart16USB init");
    this.log = log;
    try {
      this.board = new Relay();
    } catch (e) {
      log("Problem initializing connection to relay board.");
      log(e);
    }

    const uuid = UUIDGen.generate("sainsmart-16-usb");

    const accessory = new Accessory("sainsmart-16-usb", uuid);
    accessory.on("identify", this.identify.bind(this));

    for (var i = 0; i < 16; i++) {
      accessory
        .addService(Service.Switch, "Relay " + i + 1)
        .getCharacteristic(Characteristic.On)
        .on("set", this.set.bind(this, i))
        .on("get", this.get.bind(this, i));
    }
    this.api.registerPlatformAccessories(packageName, platformName, [
      accessory
    ]);
    log("registered");
  }

  identify(paired, callback) {
    this.log(accessory.displayName, "Identify!!!");
    callback();
  }

  set(index, value, callback) {
    this.log("Set Relay " + index + " -> " + value);
    this.board.set(index, value);
    callback();
  }

  get(index, callback) {
    const value = this.board.stateArray[index];
    this.log("Get Relay " + index + " -> " + value);
    callback(null, value);
  }
}
