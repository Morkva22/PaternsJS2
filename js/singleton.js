class House {
    constructor() {
        if (House.instance) {
            return House.instance;
        }
        this.devices = new Map();
        this.users = [];
        this.temperature = 22;
        House.instance = this;
        this.initializeDevices();
    }

    initializeDevices() {
        this.devices.set('light', { status: 'off', type: 'light' });
        this.devices.set('door', { status: 'locked', type: 'door' });
        this.devices.set('music', { status: 'off', type: 'music' });
        this.devices.set('heating', { status: 'eco', type: 'heating' });
    }

    addUser(user) {
        this.users.push(user);
        this.updateUsersDisplay();
    }

    updateUsersDisplay() {
        const usersList = document.getElementById('usersList');
        if (this.users.length === 0) {
            usersList.innerHTML = '<p style="color: #718096; text-align: center;">No users added</p>';
        } else {
            usersList.innerHTML = this.users.map(user =>
                `<div class="status-item">${user.name}</div>`
            ).join('');
        }

        const receiverSelect = document.getElementById('messageReceiver');
        receiverSelect.innerHTML = '<option value="all">All Users</option>';
        this.users.forEach(user => {
            receiverSelect.innerHTML += `<option value="${user.name}">${user.name}</option>`;
        });
    }
}

class User {
    constructor(name) {
        this.name = name;
    }

    sendMessage(message, receiver = 'all') {
        houseChatRoom.sendMessage(this, message, receiver);
    }
}