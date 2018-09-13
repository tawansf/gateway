'use_strict'

const express = require('express')
const cartaoRouter = express.Router()
const requestCartao = require('request')

// const seller = '08780311-a9e4-4669-b511-3e58375f67c9'
cartaoRouter.post('/', (req, res, next) => {
    // res.status(200).json({
    //     mensagem: "POST deu certo demais homi",
    //     header: req.headers['app']
    // })
    //Headers
    // console.log(authToken);
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 61d41db9-cedd-4f78-8b0c-fc67f61c609e',
        'seller_id': '08780311-a9e4-4669-b511-3e58375f67c9'
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
            // var info = JSON.parse(body)
            res.send(body)
        }else{
            // var info = JSON.parse(body)
            res.send(body)
        }
    });

})
cartaoRouter.get('/', (req, res, next) => {
    res.status(200).json({
        mensagem: "GET deu certo demais homi"
    })
})

module.exports = cartaoRouter