const express = require('express');
const db = require('../database/db');
const cookieParser = require('cookie-parser');
const Cliente = require('../models/cliente');
const Conta = require('../models/conta');
const generatorAccountNumber = require('../services/generateAccountNumber');
const router = express.Router(); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
    const { name, cpf, email, password, date } = req.body;

    const client = new Cliente(name, cpf, email, password, date);

    if (!name || !email || !password || !cpf || !date) {
        return res.status(400).send({ error: 'Dados inválidos' });
    }

    try {
        const cryptoPassword = await bcrypt.hash(password, 10);

        await db.run('INSERT INTO cliente (name, cpf, email, password, birthDay) VALUES (?, ?, ?, ?, ?)', [name, cpf, email, cryptoPassword, date], async function (err) {
            if (err) {
                console.error('Erro ao inserir cliente:', err);
                return res.status(500).send({ error: 'Erro no servidor' });
            }

            const agency = "0703";
            const accountNumber = generatorAccountNumber();
            
            const balance = 0.00;
            const account = new Conta(agency, accountNumber, balance);

            let existingAccountNumber = await db.get(`SELECT COUNT(*) as count FROM conta WHERE numero = ?`, [accountNumber]);

            while (existingAccountNumber.count > 0) {
                accountNumber = generatorAccountNumber();
                existingAccountNumber = await db.get(`SELECT COUNT(*) as count FROM conta WHERE numero = ?`, [accountNumber]);
            }

            db.run('INSERT INTO conta (agencia, numero, saldo, email_cliente) VALUES (?, ?, ?, ?)', [account.agencia, accountNumber, account.saldo, client.email], function (err) {
                    if (err) {
                        console.error('Erro ao inserir conta:', err);
                        return res.status(500).send({ error: 'Erro no servidor' });
                    }
                });
                return res.status(201).send({ message: 'Você foi cadastrado com sucesso!' })
            });

    } catch (err) {
        console.error('Erro durante o cadastro:', err);
        console.log('Dados recebidos:', req.body);
        return res.status(500).send({ error: 'Erro no servidor' });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM cliente WHERE email = ?';

    db.get(sql, [email], async (err, cliente) => {
        if (err) {
            console.error('Erro ao acessar o usuário: ' + err);
            return res.status(500).send({ error: 'Erro no servidor.' });

        } else if (!cliente) {
            return res.status(400).send({ error: 'Usuário não cadastrado!' });
        }

        const validPassword = await bcrypt.compare(password, cliente.password);

        if (!validPassword) {
            return res.status(400).send({ error: 'Senha inválida!' });
        }
        
        const token = jwt.sign({ email: cliente.email }, process.env.MINHA_VARIAVELAMBIENTE, {
            expiresIn: 7200 // expira em duas horas
        });

        res.cookie('auth', token);

        return res.status(200).send({ message: 'Logado com sucesso!' });
    });
});

router.use(cookieParser());

router.get('/api/admin/dashboard', async (req, res) => {
    try {
        const token = req.cookies.auth;
        const decoded = jwt.verify(token, process.env.MINHA_VARIAVELAMBIENTE);

        if (!decoded) {
            return res.status(401).send({ error: "<h2>Não autorizado. Faça o seu Login para poder acessar</h2>" });
        }

        const email = decoded.email;

        db.get('SELECT saldo FROM conta WHERE email_cliente = ?', [email], async (err, row) => {
            if (err) {
                console.error('Erro ao acessar o saldo: ' + err);
                return res.status(500).send({ error: 'Erro no servidor.' });
            }

            res.json({ saldo: row ? row.saldo : 0 });
        });
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).send('<h2>Permissão negada! Faça seu <a href="/users/login">login</a> primeiramente</h2> <style> body {font-family: "Arial"; font-size: 18px}; a { color: "blue" }</style>');
    }
});

router.post('/api/admin/deposit', async (req, res) => {
    try {
        const token = req.cookies.auth;
        const decoded = jwt.verify(token, process.env.MINHA_VARIAVELAMBIENTE);

        const email = decoded.email;

        const { depositAmount } = req.body;

        if (!depositAmount || isNaN(depositAmount)) {
            return res.status(400).send({ error: "Valor de depósito inválido" });
        }

        
        db.serialize(() => {
            const sql = `UPDATE cliente SET saldo = ? WHERE email = ?`
            const sql_account = `UPDATE conta SET saldo = ? WHERE email_cliente = ?`

            db.run('BEGIN TRANSACTION')

            db.get('SELECT * FROM cliente WHERE email = ?', [email], async (err, row) => {
                if (err) {
                    console.error('Erro ao encontrar "cliente"' + err)
                    return res.status(500).json({message: "Erro ao se conectar ao nosso servidor"})
                }
                if(!row) {
                    db.run('ROLLBACK')
                    return res.status(400).json({ message: "Não foi possível achar uma conta associada a sua!"})
                }

                const newBalance = row.saldo += parseFloat(depositAmount)

                db.run(sql, [newBalance, email], async (err) => {
                    if(err) {
                        console.error("Erro no depósito: "+ err)
                        db.run('ROLLBACK')
                        return res.send("<h2>Não foi possível efetuar o depósito</h2>")
                    }

                db.get('SELECT * FROM conta WHERE email_cliente = ?', [email], async (err, rowConta) => {
                    if(err) {
                        console.error('Erro ao acessar saldo de Conta: ' + err)
                    }

                    if(!rowConta) {
                        db.run('ROLLBACK')
                        return res.status(400).json({ message: "Não foi possível achar uma conta associada a sua!"})
                    }
                
                const account = new Conta(rowConta.agencia, rowConta.numero, rowConta.saldo)
                account.depositar(parseFloat(depositAmount));

                db.run(sql_account, [account.saldo, email], (err) => {
                    if (err) {
                        console.error('Erro ao atualizar saldo: ' + err)
                    }
                    db.run('COMMIT', () => {
                        return res.redirect('/admin/dashboard')
                        })
                    })
                })
            })
        })})

        /* db.serialize(() => {
            db.run('BEGIN TRANSACTION');

            db.get('SELECT * FROM cliente WHERE email = ?', [email], async (err, row) => {
                if (err) {
                    console.error('Erro ao acessar o cliente: ' + err);
                    return res.status(500).send({ error: 'Erro no servidor.' });
                }

                if (!row) {
                    return res.status(404).send({ error: 'Cliente não encontrado' });
                }

                const novoSaldoCliente = row.saldo + parseFloat(depositAmount);

                db.run('UPDATE cliente SET saldo = ? WHERE email = ?', [novoSaldoCliente, email], async (err) => {
                    if (err) {
                        console.error('Erro ao atualizar o saldo do cliente:', err);
                        db.run('ROLLBACK');
                        return res.status(500).send({ error: 'Erro no servidor.' });
                    }

                    db.get('SELECT * FROM conta WHERE email_cliente = ?', [email], async (err, rowConta) => {
                        if (err) {
                            console.error('Erro ao acessar a conta: ' + err);
                            db.run('ROLLBACK');
                            return res.status(500).send({ error: 'Erro no servidor.' });
                        }

                        if (!rowConta) {
                            db.run('ROLLBACK');
                            return res.status(404).send({ error: 'Conta não encontrada' });
                        }

                        const conta = new Conta(rowConta.agencia, rowConta.numero, rowConta.saldo);
                        conta.depositar(parseFloat(depositAmount));

                        db.run('UPDATE conta SET saldo = ? WHERE email_cliente = ?', [conta.saldo, email], async (err) => {
                            if (err) {
                                console.error('Erro ao atualizar o saldo da conta:', err);
                                db.run('ROLLBACK');
                                return res.status(500).send({ error: 'Erro no servidor.' });
                            }

                            db.run('COMMIT', () => {
                                res.json({ message: 'Depósito realizado com sucesso' });
                            });
                        });
                    });
                });
            });
        }); */
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).send('<h2>Permissão negada! Faça seu <a href="/users/login">login</a> primeiramente</h2> <style> body {font-family: "Arial"; font-size: 18px}; a { color: "blue" }</style>');
    }
});

module.exports = router