const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message: ${message}`);
        ws.send('CONFIDENTIAL_DATA'); // Отправка конфиденциальной информации
    });

    console.log('Client connected');
});

console.log('WebSocket server is running on ws://localhost:8081');
