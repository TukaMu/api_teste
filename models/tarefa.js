
const mongoose = require('../mongodb/db')

const TarefaSchema = new mongoose.Schema({
    Nome: {
        type: String,
        require: true,
    },
    Local: {
        type: String,
        require: true,
    },
    tini: {
        type: Date,
        require: true,
    },
    tfim: {
        type: Date,
        require: true,
    },
    ttotal: {
        type: Date,
        require: true,
    }
})

const tarefa = mongoose.model('tarefas', TarefaSchema)

module.exports = tarefa