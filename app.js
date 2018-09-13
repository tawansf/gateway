const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
// Rotas
const cartaoRouter = require('./routes/api/cartao/token/token')

app.use(morgan('dev'))
app.use('/cartao', cartaoRouter)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', (req, res, next) => {
    res.json({
        title: 'Node API - Getnet',
        version: '1.0.0',
        descricao: 'Integração com a Getnet - Por : Santander'
    })
})
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})
app.use((req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            mensagem: error.message 
        }
    })
})

module.exports = app