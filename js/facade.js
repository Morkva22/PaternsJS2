class SmartHomeFacade {
    constructor() {
        this.remoteControl = new RemoteControl();
        this.setupCommands();
    }

    setupCommands() {
        this.remoteControl.setCommand('lightOn', new LightOnCommand());
        this.remoteControl.setCommand('lightOff', new LightOffCommand());
        this.remoteControl.setCommand('doorLock', new DoorLockCommand());
        this.remoteControl.setCommand('doorUnlock', new DoorUnlockCommand());
    }

    leaveHome() {
        addLog('FACADE: Executing leave home sequence');
        this.remoteControl.pressButton('lightOff');
        this.remoteControl.pressButton('doorLock');
        house.devices.get('music').status = 'off';
        this.updateFacadeStatus('Left home - all systems secured');
    }

    arriveHome() {
        addLog('FACADE: Executing arrive home sequence');
        this.remoteControl.pressButton('doorUnlock');
        this.remoteControl.pressButton('lightOn');
        house.devices.get('music').status = 'on';
        this.updateFacadeStatus('Arrived home - welcome back!');
    }

    updateFacadeStatus(message) {
        const status = document.getElementById('facadeStatus');
        const statusDiv = document.createElement('div');
        statusDiv.className = 'status-item';
        statusDiv.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        status.appendChild(statusDiv);
        status.scrollTop = status.scrollHeight;
    }
}