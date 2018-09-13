'use_strict'

const express = require('express')
const authRouter = express.Router()
const requestAuth = require('request')

const { base64encode, base64decode } = require('nodejs-base64');
const he = 'a23548b2-55ff-4b45-8630-ada5e54c6412:620a87b2-116a-4ca1-8118-e3ad7e5d7e35';
const encoded = base64encode(he);

authRouter.post('/', (req, res, next) => {
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic '+encoded
    }
    var form = {
        'scope': 'oob',
        'grant_type': 'client_credentials'
    }
    var options = {
        url: 'https://api-sandbox.getnet.com.br/auth/oauth/v2/token',
        method: 'POST',
        headers: headers,
        form: form
    }
    requestAuth(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            res.json({
                mensagem: 'Sucesso',
                bearer: info.token_type+" "+info.access_token,
                resposta: info
            });
        }else{
            var info = JSON.parse(body)
            res.json({
                mensagem: 'Erro ao gerar token',
                resposta: info
            })
        }
    });
})
module.exports = authRouter