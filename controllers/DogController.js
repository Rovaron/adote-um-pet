var debug = require('debug')('adoteumpet:controller');
var Promise = require('bluebird');

function DogController(DogModel) {
    this.model = Promise.promisifyAll(DogModel);
};

function handleNotFound (data){
    if(!data){
        var error = new Error('Not Found');
        err.status = 404;
        throw error;
    }
    return data;
}

DogController.prototype.getAll = function(request, response, next){
    this.model.findAsync({})
        .then(function(data){
            response.json(data);
        })
        .catch(next);
}

DogController.prototype.getById = function(request, response, next){
    var _id = request.params._id;
    this.model.findOneAsync(_id)
        .then(handleNotFound)
        .then(function(data){
            response.json(data);
        })
    .catch(next);
}

DogController.prototype.create = function(request, response, next){
    var body = request.body;
    this.model.createAsync(body)
        .then(function(error, data){
            response.json(data);
    })
    .catch(next);
}

DogController.prototype.update = function(request, response, next){
    var _id = request.params._id;
    var body = request.body;
    this.model.updateAsync(_id, body)
        .then(function(err, data){
            response.json(data);
    })
    .catch(next);   
}

DogController.prototype.remove = function(request, response, next){
    var _id = request.params._id;
    this.model.removeAsync(_id)
        .then(function(err, data){
            response.json(data);
        })
    .catch(next);
}

module.exports = function(DogModel) {
    return new DogController(DogModel);
}
