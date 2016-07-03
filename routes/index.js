var express = require('express'),
    router = express.Router();

router.get('/', function (request, response){
    response.status(201);
    if(request.accepts('text')){
        response.write('name; email\n');
        response.write('Guilherme Rovaron; gui.rovaron@gmail.com\n');
        response.end();
    } else {
        response.json({ name: 'Guilherme Rovaron', email: 'gui.rovaron@gmail.com'});
    }
})

//dogs
router.use('/dogs', require('./dogs'));

module.exports = router;
