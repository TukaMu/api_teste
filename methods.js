const { text } = require('body-parser');
const express = require('express');

const methods = express.Router();


//
let db = [
    { id: '1', Tarefa: 'Tarefa domiciliar', Local: 'casa', tini: '0', tfim: '0', ttotal: '0' },
    { id: '2', Tarefa: 'Tarefa remota', Local: 'qualquer lugar', tini: '0', tfim: '0', ttotal: '0' },
    { id: '3', Tarefa: 'Tarefa presencial', Local: 'empresa', tini: '0', tfim: '0', ttotal: '0' }]
//


//ENUNCIADO
methods.get('/', (req, res) => {
    return res.send('Listar = http://localhost:33533/listar\n Colocar = http://localhost:33533/colocar            +       json\n Deletar = http://localhost:33533/deletar:id                 id = id da tarefa\n Atualizar = http://localhost:33533/atualizar:id/:action     id = id da tarefa      action = 1 : iniciar tarefa\n                                                                                             || 2 : termina tarefa');
})

//MOSTRAR TAREFAS
methods.get('/listar', (req, res) => {
    return res.json(db);
})

//COLOCA TAREFAS
methods.post('/colocar', (req, res) => {
    const requerido = req.body;

    if (!requerido)
        return res.status(400).end();

    else if (db.find(item => item.id === requerido.id)) {
        return res.send('Id já existente');
    }
    else {
        db.push(requerido);
    }
    return res.send(db);
})

//DELETA TAREFA
methods.delete('/deletar:id', (req, res) => {
    const id = req.params.id;

    if (db.find(item => item.id === id)) {
        let dbatt = db.filter(item => {
            if (item.id != id)
                return item;
        })
        return res.send(db = dbatt);
    }
    else {
        return res.send('O Id não está cadastrado');
    }

})

//ATUALIZAR TAREFA
methods.get('/atualizar:id/:action', (req, res) => {
    const id = req.params.id;
    const action = req.params.action;

    if (db.find(item => item.id === id)) {
        if (action == 1) {
            let dbatt = db.filter(item => {
                if (id == item.id) {
                    item.tini = new Date();
                }
                return item;
            })
            return res.send(db = dbatt);
        }
        else if (action == 2) {
            let dbatt = db.filter(item => {
                if (id == item.id) {
                    if (item.tini != '0') {
                        item.tfim = new Date();
                        item.ttotal = parseFloat(((item.tfim - item.tini) / 60000).toFixed(2)) + " minutos";
                    }
                    else {
                        return res.send('A tarefa não foi iniciada!')
                    }
                }
                return item;
            })
            return res.send(db = dbatt);
        }
        else {
            return res.send('Ação incorreta!');
        }

    }
    return res.send('Id incorreto!');
})

module.exports = methods
