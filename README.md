Exposes a single sainsmart 16-relay usb board as a 16 switch accessories in
homebridge. You can label these relays as needed in the Home app. I personally
use this in conjunction with 12v solenoids as an irrigation controller on my
coffee farm.

**Please note that currently only a single board is supported.**

# Installation

`npm install -g homebridge-sainsmart-16-usb`

You will need to ensure the user running homebridge has access to your usb
device. To do this setup a [udev rule](https://github.com/node-hid/node-hid#udev-device-permissions).
