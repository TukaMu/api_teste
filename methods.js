const { text } = require('body-parser');
const express = require('express');
const { send } = require('express/lib/response');

const methods = express.Router();


//
let db = [
    { id: '1', Tarefa: 'Tarefa domiciliar', Local: 'casa', tini: '0', tfim: '0', ttotal: '0' },
    { id: '2', Tarefa: 'Tarefa remota', Local: 'qualquer lugar', tini: '0', tfim: '0', ttotal: '0' },
    { id: '3', Tarefa: 'Tarefa presencial', Local: 'empresa', tini: '0', tfim: '0', ttotal: '0' }]
//


//MOSTRAR TAREFAS
methods.get('/listar', (req, res) => {
    return res.json(db)
})

//COLOCA TAREFAS
methods.post('/colocar', (req, res) => {
    const requerido = req.body

    if (!requerido)
        return res.status(400).end()
    else if (db.find(item => item.id === requerido.id)) {
        return res.send('Id já existente')
    }
    else {
        db.push(requerido)
        return res.send(db)
    }
})

//DELETA TAREFA
methods.delete('/deletar:id', (req, res) => {
    const id = req.params.id

    let dbatt = db.filter(item => {
        if (item.id != id)
            return item
    })
    return res.send(db = dbatt)

})

//ATUALIZAR TAREFA
methods.get('/tarefa:id/:action', (req, res) => {
    const id = req.params.id
    const action = req.params.action
    const item = db.find(item => item.id === id)

    if (action == 1) {
        item.tini = new Date()
    }
    else if (item.tini != '0') {
        item.tfim = new Date();
        item.ttotal = parseFloat(((item.tfim - item.tini) / 60000).toFixed(2)) + " minutos"
    }
    return res.send(db)
})

//EDITAR TAREFA
methods.put('/editar', (req, res) => {
    const requerido = req.body;
    if (requerido) {
        const item = db.find(item => item.id === requerido.id)
        item.Tarefa = requerido.Tarefa
        item.Local = requerido.Local
        return res.send(db)
    }
    else {
        return res.status(400).end()
    }
})

module.exports = methods
