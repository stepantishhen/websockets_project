const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Received data: ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Data received\n');
});

server.listen(8000, () => {
    console.log('HTTP server is running on http://localhost:8000');
});
