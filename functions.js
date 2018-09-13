'use_strict'

const requestToken = require('request')
const { base64encode, base64decode } = require('nodejs-base64')

exports.authToken = function () {
    const he = 'seller:clientid';
    const encoded = base64encode(he);
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic '+encoded
    }
    var form = {
        'scope': 'oob',
        'grant_type': 'client_credentials'
    }
    //request
    var options = {
        url: 'https://api-sandbox.getnet.com.br/auth/oauth/v2/token',
        method: 'POST',
        headers: headers,
        form: form
    }
    // Start the request
    requestToken(options, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            var info = JSON.parse(body)
            res.send({'auth_token': info.token_type+" "+info.access_token});
        }else{
            var error = { 'mensagem': 'Erro ao gerar token' }
            var msg_error = JSON.parse(error)
            res.send(msg_error)
        }
    });
}
exports.myDateTime = function () {
    return Date();
};