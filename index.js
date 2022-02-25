const express = require('express')
const morgan = require('morgan')
const bp = require('body-parser')
const methods = require('./methods')

const api = express()

api.use(morgan('dev'))
api.use(bp.urlencoded({ extended: false }))
api.use(express.json())
api.use(methods)

api.listen(33533, () => {
    console.log('Api Running => http://localhost:33533')
})