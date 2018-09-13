const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
// Rotas
const cartaoRouter = require('./routes/api/cartao/token/token')
const testeRouter = require('./routes/teste/test')
const authRouter = require('./routes/api/auth/auth')

app.use(morgan('dev'))
app.use('/token/cartao', cartaoRouter)
app.use('/teste/token/cartao', testeRouter)
app.use('/auth', authRouter)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', (req, res, next) => {
    res.json({
        title: 'Getnet API',
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