const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Хранилище сессий для хранения учетных данных (в реальном мире это должно быть более безопасно)
let sessions = {};

wss.on('connection', function connection(ws, req) {
    // Генерация простого идентификатора сессии
    let sessionId = Math.random().toString(36).substring(2);
    sessions[sessionId] = { credentials: 'sensitive_data' };

    // Отправка идентификатора сессии клиенту
    ws.send(JSON.stringify({ sessionId: sessionId }));

    ws.on('message', function incoming(message) {
        console.log('received:', message);

        // Разбор сообщения
        let data;
        try {
            data = JSON.parse(message);
        } catch (e) {
            console.log('Invalid JSON');
            return;
        }

        // Обработка команд
        if (data.action === 'steal') {
            let session = sessions[data.data];
            if (session) {
                ws.send(`Stolen credentials: ${session.credentials}`);
            } else {
                ws.send('Session not found');
            }
        } else {
            ws.send('Unknown action');
        }
    });

    ws.on('close', function () {
        delete sessions[sessionId];
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
