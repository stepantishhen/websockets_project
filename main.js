const WebSocket = require('ws');

// Создаем WebSocket сервер
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('Новое WebSocket соединение установлено.');

    // Обработчик входящих сообщений от клиента
    socket.on('message', (message) => {
        const receivedData = JSON.parse(message);
        console.log('Получено сообщение от клиента:', receivedData);

        // Отправка тестового ответа
        if (receivedData.type === 'test') {
            const response = {
                type: 'testResponse',
                data: 'Hello, Client!'
            };
            socket.send(JSON.stringify(response));
        }

        // Обработка других сообщений
        if (receivedData.type === 'attack') {
            console.log('Получены вредоносные данные:', receivedData);
            // Дополнительная обработка вредоносных данных
        }
    });

    // Обработчик закрытия соединения
    socket.on('close', () => {
        console.log('WebSocket соединение закрыто.');
    });

    // Обработчик ошибок
    socket.on('error', (error) => {
        console.error('Ошибка WebSocket соединения: ' + error.message);
    });
});

// Создание списка уязвимостей
const vulnerabilities = [
    {
        name: "Injection flaw in search module",
        severity: "critical",
        recommendation: "Implement proper input validation and sanitation."
    },
    {
        name: "Insecure direct object reference",
        severity: "high",
        recommendation: "Ensure access controls are properly implemented."
    }
];

// Функция для генерации отчета об уязвимостях
function generateVulnerabilityReport(vulnerabilities) {
    console.log("Отчет об уязвимостях:");
    vulnerabilities.forEach((vulnerability, index) => {
        console.log(`${index + 1}. ${vulnerability.name} (${vulnerability.severity})`);
        console.log(`Рекомендация: ${vulnerability.recommendation}`);
    });
}

// Генерация отчета через 60 секунд
setTimeout(() => {
    generateVulnerabilityReport(vulnerabilities);
}, 10000);

console.log('WebSocket сервер запущен на порту 8080');
