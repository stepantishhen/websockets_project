const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const wss = new WebSocket.Server({ port: 8080 });

// Инициализация базы данных SQLite
let db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (id INT, name TEXT)");

    let stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
    stmt.run(1, 'Alice');
    stmt.run(2, 'Bob');
    stmt.finalize();
});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received:', message);

        // Подверженность инъекции (например, SQL Injection)
        let query = `SELECT * FROM users WHERE name = '${message}'`;
        // Safety variant
        // let query = `SELECT * FROM users WHERE name = ?`;
        console.log('Executing query:', query);

        // Выполнение потенциально вредоносного запроса
        db.all(query, [], (err, rows) => {
            if (err) {
                ws.send(`Error: ${err.message}`);
            } else {
                ws.send(JSON.stringify(rows));
            }
        });
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
