var mongojs = require('mongojs'),
    config = require('config'),
    debug = require('debug')('adoteumpet:db');

'use-strict';
function _connection(){
    var username = config.get('mongo.username'),
        password = config.get('mongo.password'),
        server = config.get('mongo.server'),
        port = config.get('mongo.port'),
        database = config.get('mongo.database'),
        auth = username ? username + ':' + password + '@' : '';
    return 'mongodb://' + auth + server + ':' + port + '/' + database;
}

var db = mongojs(_connection());
db.on('error', function(error){
    debug(error);
});

module.exports = db;