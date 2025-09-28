const house = new House();
const houseChatRoom = new HouseChatRoom();
const smartHomeFacade = new SmartHomeFacade();
const heatingSystem = new HeatingSystem();
const temperatureSensor = new TemperatureSensor();
const legacyDevice = new LegacyDevice();
const legacyAdapter = new LegacyDeviceAdapter(legacyDevice);

temperatureSensor.subscribe(heatingSystem);

function addLog(message) {
    const logs = document.getElementById('systemLogs');
    const logDiv = document.createElement('div');
    logDiv.className = 'status-item';
    logDiv.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;

    if (logs.innerHTML.includes('System initialized')) {
        logs.innerHTML = '';
    }

    logs.appendChild(logDiv);
    logs.scrollTop = logs.scrollHeight;
}

function addTemperatureLog(message) {
    const status = document.getElementById('temperatureStatus');
    const statusDiv = document.createElement('div');
    statusDiv.className = 'status-item';
    statusDiv.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;

    if (status.innerHTML.includes('System monitoring')) {
        status.innerHTML = '';
    }

    status.appendChild(statusDiv);
    status.scrollTop = status.scrollHeight;
}

function executeCommand(commandType) {
    smartHomeFacade.remoteControl.pressButton(commandType);
}

function leaveHome() {
    smartHomeFacade.leaveHome();
}

function arriveHome() {
    smartHomeFacade.arriveHome();
}

function changeHeatingMode() {
    const mode = document.getElementById('heatingMode').value;
    if (mode === 'eco') {
        heatingSystem.setStrategy(new EcoMode());
    } else {
        heatingSystem.setStrategy(new ComfortMode());
    }
    house.devices.get('heating').status = mode;
    const result = heatingSystem.heat();
    addLog(`STRATEGY: ${result}`);
}

function changeTemperature(temp) {
    temperatureSensor.setTemperature(temp);
}

function addUser() {
    const userName = document.getElementById('userName').value.trim();
    if (userName) {
        const user = new User(userName);
        house.addUser(user);
        houseChatRoom.addUser(user);
        addLog(`USER: ${userName} added to the house`);
        document.getElementById('userName').value = '';
    }
}

function sendMessage() {
    const message = document.getElementById('messageInput').value.trim();
    const receiver = document.getElementById('messageReceiver').value;

    if (message && house.users.length > 0) {
        const sender = house.users[0];
        sender.sendMessage(message, receiver);
        document.getElementById('messageInput').value = '';
    }
}

function controlLegacyDevice(action) {
    const status = document.getElementById('legacyStatus');
    let result;

    if (action === 'on') {
        result = legacyAdapter.turnOn();
    } else {
        result = legacyAdapter.turnOff();
    }

    const statusDiv = document.createElement('div');
    statusDiv.className = 'status-item';
    statusDiv.textContent = `[${new Date().toLocaleTimeString()}] ADAPTER: ${result}`;

    if (status.innerHTML.includes('Legacy devices ready')) {
        status.innerHTML = '';
    }

    status.appendChild(statusDiv);
    status.scrollTop = status.scrollHeight;

    addLog(`LEGACY: ${result}`);
}

function runDaySimulation() {
    addLog('SIMULATION: Starting day simulation');

    setTimeout(() => {
        if (!house.users.find(u => u.name === 'John')) {
            document.getElementById('userName').value = 'John';
            addUser();
        }
        if (!house.users.find(u => u.name === 'Alice')) {
            document.getElementById('userName').value = 'Alice';
            addUser();
        }
    }, 500);

    setTimeout(() => {
        arriveHome();
    }, 1000);

    setTimeout(() => {
        house.users[0]?.sendMessage('I just got home!', 'all');
    }, 1500);

    setTimeout(() => {
        changeTemperature(25);
    }, 2000);

    setTimeout(() => {
        house.users[1]?.sendMessage('Temperature increased to 25°C', 'all');
    }, 2500);

    setTimeout(() => {
        executeCommand('lightOff');
    }, 3000);

    setTimeout(() => {
        leaveHome();
    }, 3500);

    setTimeout(() => {
        addLog('SIMULATION: Day simulation completed');
    }, 4000);
}

function clearLogs() {
    document.getElementById('systemLogs').innerHTML = '<p style="color: #718096; text-align: center;">System initialized</p>';
    document.getElementById('temperatureStatus').innerHTML = '<p style="color: #718096; text-align: center;">System monitoring</p>';
    document.getElementById('facadeStatus').innerHTML = '<p style="color: #718096; text-align: center;">Ready for commands</p>';
    document.getElementById('chatMessages').innerHTML = '<p style="color: #718096; text-align: center;">Chat room initialized</p>';
    document.getElementById('legacyStatus').innerHTML = '<p style="color: #718096; text-align: center;">Legacy devices ready</p>';
}

addLog('Smart Home System initialized with all design patterns');
addLog('Singleton: House instance created');
addLog('Command: Remote control system ready');
addLog('Facade: Smart home automation ready');
addLog('Observer: Temperature monitoring active');
addLog('Strategy: Heating system configured');
addLog('Decorator: Command logging enabled');
addLog('Adapter: Legacy device support enabled');
addLog('Mediator: Communication system online');