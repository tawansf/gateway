'use_strict'

const { base64encode, base64decode } = require('nodejs-base64');

function auth_token(){
    const he = 'a23548b2-55ff-4b45-8630-ada5e54c6412:620a87b2-116a-4ca1-8118-e3ad7e5d7e35';
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
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            res.send({'auth_token': info.token_type+" "+info.access_token});
        }else{
            var error = { 'mensagem': 'Erro ao gerar token' }
            var msg_error = JSON.parse(error)
            res.send(msg_error)
        }
    });
}