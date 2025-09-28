class LegacyDevice {
    oldTurnOn() {
        return 'Legacy device activated via old interface';
    }

    oldTurnOff() {
        return 'Legacy device deactivated via old interface';
    }
}

class LegacyDeviceAdapter {
    constructor(legacyDevice) {
        this.legacyDevice = legacyDevice;
    }

    turnOn() {
        return this.legacyDevice.oldTurnOn();
    }

    turnOff() {
        return this.legacyDevice.oldTurnOff();
    }
}