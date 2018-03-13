Accessory type for the sainsmart 16-relay usb board.

**Please note that currently only a single board is supported.**

# Installation

`npm install -g homebridge-sainsmart-16-usb`

You will need to ensure the user running homebridge has access to your usb
device. To do this setup a [udev rule](https://github.com/node-hid/node-hid#udev-device-permissions).

```
"accessories": [
  {
    "accessory": "Sainsmart16USBRelay",
    "name": "Coffee Maker",
    "relay": 0 #zero-based index (0-15)
  },
  {
    "accessory": "Sainsmart16USBRelay",
    "name": "Lamp",
    "relay": 3
  }
]
```
