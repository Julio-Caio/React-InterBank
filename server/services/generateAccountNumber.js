function generatorAccountNumber() {
    let accountNumber = Math.floor(Math.random() * 9999999999)

    if (accountNumber === 0) {
        accountNumber = Math.floor(Math.random() * 9999999999)
    }
    
    accountNumber = parseInt(accountNumber)

    return accountNumber
}

module.exports = generatorAccountNumber;