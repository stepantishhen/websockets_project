const http = require('http');

let requestCount = 0;
const MAX_REQUESTS = 1000;

const server = http.createServer((req, res) => {
    requestCount++;
    console.log(`Received request ${requestCount}: ${req.url}`);

    if (requestCount > MAX_REQUESTS) {
        console.log('Server has been overwhelmed and will now shut down.');
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('Server is overwhelmed and shutting down\n');
        server.close(() => {
            console.log('Server has shut down.');
            process.exit();
        });
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Request received\n');
});

server.listen(8000, () => {
    console.log('Target server is running on http://localhost:8000');
});
