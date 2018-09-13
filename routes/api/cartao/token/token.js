'use_strict'

const express = require('express')
const cartaoRouter = express.Router()
const requestCartao = require('request')

cartaoRouter.post('/', (req, res, next) => {
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {token_auth}',
        'seller_id': 'sellerid'
    }
    var form = {
        'card_number': '4242424242424242',
        'customer_id': 'customer_21081826'
    }
    var options = {
        url: 'https://api-sandbox.getnet.com.br/v1/tokens/card',
        method: 'POST',
        headers: headers,
        form: form
    }
    requestCartao(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            res.json({
                mensagem: "Sucesso",
                resposta: info
            })
        }else{
            var info = JSON.parse(body)
            res.json({
                mensagem: "Erro ao gerar token do cartao",
                resposta: info
            })
        }
    });

})
cartaoRouter.get('/', (req, res, next) => {
    res.status(200).json({
        mensagem: "GET deu certo demais homi"
    })
})

module.exports = cartaoRouter