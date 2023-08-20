const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/banco.sqlite3', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conexão bem-sucedida ao banco de dados SQLite.');
    }
});

db.run(`
  CREATE TABLE IF NOT EXISTS cliente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    saldo REAL NOT NULL DEFAULT 0,
    password TEXT NOT NULL,
    birthDay TEXT NOT NULL
  )
`, (err) => {
    if (err) {
        console.log('Erro ao criar a tabela cliente:', err.message);
    } else {
        console.log('Tabela CLIENTE criada com sucesso!');
    }
});

// Fecha a conexão com o banco de dados após a criação da tabela
db.close((err) => {
    if (err) {
        console.error('Erro ao fechar a conexão com o banco de dados:', err.message);
    } else {
        console.log('Conexão com o banco de dados fechada.');
    }
});