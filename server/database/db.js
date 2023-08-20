const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/banco.sqlite3', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados SQLite.');
  }
});

module.exports = db;