class Command {
    execute() {
        throw new Error('Execute method must be implemented');
    }
}

class LightOnCommand extends Command {
    constructor(device) {
        super();
        this.device = device;
    }

    execute() {
        house.devices.get('light').status = 'on';
        document.getElementById('lightStatus').className = 'status-indicator';
        return 'Light turned on';
    }
}

class LightOffCommand extends Command {
    constructor(device) {
        super();
        this.device = device;
    }

    execute() {
        const doorStatus = house.devices.get('door').status;
        if (doorStatus === 'unlocked') {
            addLog('PROXY: Cannot turn off light - door is unlocked for security');
            return 'Action blocked by security proxy';
        }
        house.devices.get('light').status = 'off';
        document.getElementById('lightStatus').className = 'status-indicator off';
        return 'Light turned off';
    }
}

class DoorLockCommand extends Command {
    execute() {
        house.devices.get('door').status = 'locked';
        document.getElementById('doorStatus').className = 'status-indicator off';
        return 'Door locked';
    }
}

class DoorUnlockCommand extends Command {
    execute() {
        house.devices.get('door').status = 'unlocked';
        document.getElementById('doorStatus').className = 'status-indicator';
        return 'Door unlocked';
    }
}

class LogCommandDecorator extends Command {
    constructor(command) {
        super();
        this.command = command;
    }

    execute() {
        const commandName = this.command.constructor.name;
        addLog(`EXECUTING: ${commandName}`);
        const result = this.command.execute();
        addLog(`COMPLETED: ${commandName} - ${result}`);
        return result;
    }
}

class RemoteControl {
    constructor() {
        this.commands = new Map();
    }

    setCommand(slot, command) {
        this.commands.set(slot, new LogCommandDecorator(command));
    }

    pressButton(slot) {
        const command = this.commands.get(slot);
        if (command) {
            return command.execute();
        }
        return 'No command assigned';
    }
}