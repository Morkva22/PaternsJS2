class TemperatureSensor {
    constructor() {
        this.observers = [];
        this.temperature = 22;
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    setTemperature(temp) {
        this.temperature = temp;
        house.temperature = temp;
        document.getElementById('temperatureDisplay').textContent = `${temp}°C`;
        this.notify(temp);
    }

    notify(temperature) {
        this.observers.forEach(observer => observer.update(temperature));
    }
}