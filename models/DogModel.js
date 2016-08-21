function DogModel(mongo){
    this.mongo = mongo;
}

DogModel.prototype.find = function(query, callback){
    this.mongo.collection('dogs').find(query, callback);
};

DogModel.prototype.findOne = function(_id, callback){
    var query = { _id: this.mongo.ObjectId(_id) };
    this.mongo.collection('dogs').findOne(query, callback);
};

DogModel.prototype.create = function(data, callback){
    this.mongo.collection('dogs').insert(data, callback);
};

DogModel.prototype.update = function(_id, data, callback){
    var query = { _id: this.mongo.ObjectId(_id) };
    this.mongo.collection('dogs').update(query, data, callback);
};

DogModel.prototype.remove = function(_id, callback){
    var query = { _id: this.mongo.ObjectId(_id) };
    this.mongo.collection( 'dogs').remove(query, callback);
};

module.exports = function(mongo) {
    return new DogModel(mongo);
}