
var app = require('../app');
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Adoteum.pet rodando em http://%s:%s', host, port);
});