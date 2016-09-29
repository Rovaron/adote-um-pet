var express = require('express'),
    jwt = require('jwt-simple'),
    config = require('config'),
    moment = require('moment'),
    router = express.Router();

var mongoose = require('../db/mongoose');
var DogModel = require('../models/DogModel')(mongoose);
var DogController = require('../controllers/DogController')(DogModel);

var middlewareAuth = function(request, response, next){
    var token = request.query.token;
    if(!token) {
        var error = new Error('Forbidden');
        error.status = 403;
        return next(error);
    }
    try{
        var decoded = jwt.decode(token, config.get('jwtTokenSecret'));
        var irExpired = moment(decoded.exp).isBefore(new Date());
        if(isExpired){
            var error = new Error('Unauthorized');
            error.status = 401;
            return next(error);
        } else {
            request.user = decoded.user;
            next();
        }
    } catch(error){
        return next(error);
    }
}


router.get('/', middlewareAuth, DogController.getAll.bind(DogController));

router.get('/:_id', middlewareAuth, DogController.getById.bind(DogController));

router.post('/', DogController.create.bind(DogController));

router.put('/:_id', DogController.update.bind(DogController));

router.delete('/:_id', DogController.remove.bind(DogController));

module.exports = router;