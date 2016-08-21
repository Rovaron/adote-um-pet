var express = require('express'),
    router = express.Router();

var mongo = require('../db/mongo');
var DogModel = require('../models/DogModel')(mongo);
var DogController = require('../controllers/DogController')(DogModel);

router.get('/', DogController.getAll.bind(DogController));

router.get('/:_id', DogController.getById.bind(DogController));

router.post('/', DogController.create.bind(DogController));

router.put('/:_id', DogController.update.bind(DogController));

router.delete('/:_id', DogController.remove.bind(DogController));

module.exports = router;