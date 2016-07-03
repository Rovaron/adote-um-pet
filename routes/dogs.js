var express = require('express'),
    router = express.Router();

router.get('/', function(request, response){
    response.send('get all dogs');
})

router.get('/:_id', function(resquest, response){
    response.send('get a specific dog by id');
})

router.post('/', function(resquest, response){
    response.send('create a new dog');
})

router.put('/:_id', function(request, response){
    response.send('update a dog');
})

router.delete('/:_id', function(request, response){
    response.send('delete a dog');
})

module.exports = router;
