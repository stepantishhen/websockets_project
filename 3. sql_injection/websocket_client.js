const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
    // Отправка безопасного сообщения
    ws.send("Alice");

    // Отправка сообщения с SQL-инъекцией
    ws.send("Bob'; DROP TABLE users; --");
});

ws.on('message', function incoming(data) {
    console.log('Received:', data);
});
