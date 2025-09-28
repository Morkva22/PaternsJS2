class HeatingStrategy {
    heat() {
        throw new Error('Heat method must be implemented');
    }
}

class EcoMode extends HeatingStrategy {
    heat() {
        return 'Heating in eco mode - energy efficient';
    }
}

class ComfortMode extends HeatingStrategy {
    heat() {
        return 'Heating in comfort mode - maximum comfort';
    }
}

class HeatingSystem {
    constructor() {
        this.strategy = new EcoMode();
        this.observers = [];
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    heat() {
        return this.strategy.heat();
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notify(temperature) {
        this.observers.forEach(observer => observer.update(temperature));
    }

    update(temperature) {
        const mode = house.devices.get('heating').status;
        const message = `Heating system responding to ${temperature}°C in ${mode} mode`;
        addTemperatureLog(message);
    }
}