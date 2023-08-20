const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/banco.sqlite3', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados SQLite.');
  }
});

db.run(`
    CREATE TABLE IF NOT EXISTS transacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TIMESTAMP NOT NULL,
        tipo_transacao TEXT NOT NULL,
        valor REAL NOT NULL,
        agencia TEXT NOT NULL,
        numero TEXT NOT NULL,
        saldo REAL NOT NULL,
        cliente_id INTEGER NOT NULL,
        email_cliente TEXT NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES cliente (id),
        FOREIGN KEY (email_cliente) REFERENCES cliente (email)
    )
`, (err) => {
if (err) {
    console.log('TABLE IS NOT CREATED!')
}
else {
    console.log('TABLE IS CREATED SUCCESSFULLY!');
}})

db.close((err) => {
    if(err) {
        console.error('Erro ao fechar a conexão com o banco de dados:', err.message);
    }
    else {
        console.log('Conexão com o banco de dados fechada.');
    }
})