class Conta{
    constructor(agencia, numero, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.saldo = saldo;
    }

    depositar(valor) {
    if(valor < 0) {
        console.log('Valor inválido');
        return;
    }
        this.saldo += valor;
    }

    sacar(valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
        } else {
            console.log('Saldo insuficiente');
        }
    }
}

module.exports = Conta;