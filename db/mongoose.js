var mongoose = require('mongoose'),
    debug  = require('debug')('adoteumpet:db'),
    config = require('config');

'use strict';
function _connection() {
    var username = config.get('mongo.username'),
        password = config.get('mongo.password'),
        server = config.get('mongo.server'),
        port = config.get('mongo.port'),
        database = config.get('mongo.database'),
        auth = username ? username + ':' + password + '@' : '';
    return 'mongodb://' + auth + server + ':' + port + '/' + database;
}

mongoose.connect(_connection());
var db = mongoose.connection;
db.on('error', function(error){
    debug(error);
})

db.once('open', function(callback){
    debug('connected to mongodb');
})

module.exports =  mongoose;