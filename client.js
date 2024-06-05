const WebSocket = require('ws');

// Создаем WebSocket соединение
const webSocket = new WebSocket('ws://localhost:8080');

let messageQueue = [];

// Обработчик успешного соединения
webSocket.on('open', function(event) {
    console.log('WebSocket соединение установлено.');
    // Отправляем все сообщения из очереди
    while (messageQueue.length > 0) {
        const message = messageQueue.shift();
        webSocket.send(message);
    }
});

// Функция для отправки сообщений через WebSocket, включая очередь, если соединение не установлено
function sendMessage(message) {
    if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(message);
    } else {
        messageQueue.push(message);
    }
}

// Общий обработчик входящих сообщений
webSocket.on('message', function(event) {
    const receivedData = JSON.parse(event);
    console.log('Получено сообщение от сервера:', receivedData);

    if (receivedData.type === 'testResponse') {
        console.log('Получен ответ на тестовый запрос: ' + receivedData.data);
    }

    // Дополнительная обработка перехваченных данных
    if (receivedData.type === 'intercepted') {
        console.log('Intercepted data:', receivedData);
        // Дополнительная обработка перехваченных данных
    }
});

// Обработчик закрытия соединения
webSocket.on('close', function(event) {
    console.log('WebSocket соединение закрыто.');
});

// Обработчик ошибок
webSocket.on('error', function(error) {
    console.error('Ошибка WebSocket соединения: ' + error.message);
});

// Закрытие WebSocket соединения после некоторого времени (например)
setTimeout(() => {
    webSocket.close();
}, 5000); // Устанавливаем время в миллисекундах, через которое соединение будет закрыто

// Функция отправки тестового запроса
function sendTestRequest() {
    const testData = {
        type: "test",
        message: "Hello, World!"
    };
    sendMessage(JSON.stringify(testData));
}

// Отправка тестового запроса
sendTestRequest();

// Функция отправки вредоносных данных
function sendMaliciousData() {
    const maliciousData = {
        type: 'attack',
        data: 'Malicious payload here'
    };
    sendMessage(JSON.stringify(maliciousData));
}

// Отправка вредоносных данных
sendMaliciousData();
