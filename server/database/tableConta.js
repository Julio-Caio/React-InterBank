const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/banco.sqlite3', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados SQLite.');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS conta (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agencia TEXT NOT NULL,
    numero TEXT NOT NULL,
    saldo REAL NOT NULL DEFAULT 0,
    email_cliente TEXT NOT NULL,
    FOREIGN KEY (email_cliente) REFERENCES cliente (email)
  )
`, (err) => {
  if (err) {
      console.log('TABLE IS NOT CREATED!')
  }
  else {
      console.log('TABLE CONTA IS CREATED SUCCESSFULLY!');
  }})

// Fecha a conexão com o banco de dados após a criação da tabela
db.close((err) => {
  if (err) {
    console.error('Erro ao fechar a conexão com o banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados fechada.');
  }
});