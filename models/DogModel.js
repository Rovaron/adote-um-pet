'use strict';
function DogDAO(model){
    this.model = model;
}

DogDAO.prototype.create = function(data, callback){
    var model = new this.model(data);
    model.save(function(err, result){
        callback(err, result);
    })
};

DogDAO.prototype.find = function(query, callback){
    this.model.find(query).exec(callback);
};

DogDAO.prototype.findOne = function(_id, callback){
    var query = { _id: _id};
    this.model.findOne(query).exec(callback);
};

DogDAO.prototype.update = function(_id, data, callback){
    var query = { _id: _id };
    this.model.update(query, data).exec(function(error, result){
        callbacl(error, result);
    });
};

DogDAO.prototype.remove = function(_id, callback){
    var query = { _id: _id };
    this.model.remove(query).exec(function(error, result){
        callback(err, result);
    });
};

module.exports = function(mongoose) {
    var Dog = mongoose.model('Dog',{
        name: String,
        nickname: String,
        size: String,
        weight: Number,
        breeds : [String],
        age: Number,
        description: String,
        color: String
    });
    return new DogDAO(Dog);
}