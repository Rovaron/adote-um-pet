var debug = require('debug')('adoteumpet:controller');
function DogController(DogModel) {
    this.model = DogModel;
};

DogController.prototype.getAll = function(request, response, next){
    this.model.find({}, function(error, data){
        if(error){
            return next(error);
        }
        response.json(data);
    })
}

DogController.prototype.getById = function(request, response, next){
    var _id = request.params._id;
    this.model.findOne(_id, function(error,data){
        if(error){
            return next(error);
        }
        if(!data){
            var error =  new Error('Not Found');
            error.status = 404;
            return next(error);
        }
        response.json(data);
    })
}

DogController.prototype.create = function(request, response, next){
    var body = request.body;
    this.model.create(body, function(error, data){
        if(error) {
            return next(error);
        }
        response.json(data);
    })
}

DogController.prototype.update = function(request, response, next){
    var _id = request.params._id;
    var body = request.body;
    this.model.update(_id, body, function(error, data){
        if(error){
            return next(error);
        }
        response.json(data);
    })
}

DogController.prototype.remove = function(request, response, next){
    var _id = request.params._id;
    this.model.remove(_id, function(error, data){
        if(error){
            return next(error);
        }
        response.json(data);
    })
}

module.exports = function(DogModel) {
    return new DogController(DogModel);
}
