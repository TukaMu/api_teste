const express = require('express');
const Tarefa = require('./models/tarefa')

const methods = express.Router();

/*
let db = [
    { id: '1', Tarefa: 'Tarefa domiciliar', Local: 'casa', tini: '0', tfim: '0', ttotal: '0' },
    { id: '2', Tarefa: 'Tarefa remota', Local: 'qualquer lugar', tini: '0', tfim: '0', ttotal: '0' },
    { id: '3', Tarefa: 'Tarefa presencial', Local: 'empresa', tini: '0', tfim: '0', ttotal: '0' }]
*/


//MOSTRAR TAREFAS
methods.get('/listar', async (req, res) => {
    return res.send(await Tarefa.find())
    //return res.json(db)
})

//COLOCA TAREFAS
methods.post('/colocar', async (req, res) => {
    const requerido = req.body
    const tarefa = await Tarefa.findOne({ Nome: requerido.Nome })

    if (!tarefa) {
        try {
            Tarefa.create(req.body).save()
            return res.send('{ success : Criado com sucesso }')
        } catch (err) {
            return res.status(400).send(err)
        }
    } else {
        return res.send('{ error  : Usuário existe! }')
    }

    /*   
    if (!requerido)
        return res.status(400).end()
    else if (db.find(item => item.id === requerido.id)) {
        return res.send('Id já existente')
    }
    else {
        db.push(requerido)
        return res.send(db)
    }*/


})

//DELETA TAREFA
methods.delete('/deletar:Nome', async (req, res) => {

    const tarefa = await Tarefa.findOneAndDelete({ Nome: req.params.Nome })

    if (!tarefa) {
        return res.status(400).send('{ error : Tarefa não existe}')
    } else {
        return res.send('{ success : Deletado! }')
    }

    /*let dbatt = db.filter(item => {
        if (item.id != id)
            return item
    })
    return res.send(db = dbatt)
    */
})

//ATUALIZAR TAREFA
methods.get('/tarefa:Nome/:action', async (req, res) => {
    try {
        const tarefa = await Tarefa.findOne({ Nome: req.params.Nome })
        if (req.params.action == 1) {
            tarefa.tini = new Date()
        } else {
            tarefa.tfim = new Date()
            tarefa.ttotal = parseFloat(((tarefa.tfim - tarefa.tini) / 60000).toFixed(2))
        }
        await Tarefa.findOneAndUpdate({ Nome: req.params.Nome }, { tini: tarefa.tini, tfim: tarefa.tfim, ttotal: tarefa.ttotal })
        return res.send('{ success : Atualizado ! }')
    } catch (err) {
        return res.status(400).send(err)
    }


    /*
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
    return res.send(db)*/
})

//EDITAR TAREFA
methods.put('/editar', async (req, res) => {
    try {
        await Tarefa.findOneAndUpdate({ Nome: req.body.Nome }, req.body)
        return res.send('{ success : Atualizado ! }')
    } catch (err) {
        return res.status(400).send(err)
    }

    /*
    const requerido = req.body;
    if (requerido) {
        const item = db.find(item => item.id === requerido.id)
        item.Tarefa = requerido.Tarefa
        item.Local = requerido.Local
        return res.send(db)
    }
    else {
        return res.status(400).end()
    }*/
})

module.exports = methods
