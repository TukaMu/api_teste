const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/Tarefasdb').then(() => {
    console.log('Banco conectado!')
}).catch((err) => {
    console.log('Erro na conexão com o Banco : ' + err)
})

module.exports = mongoose