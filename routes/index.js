var express = require('express'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    config = require('config'),
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

router.post('/login', function(request, response, next){
    var username = request.body.username;
    var password = request.body.password;

    if(username === 'Shawii' && password === '7488yn2w'){
        var expires = moment().add(7, 'days').valueOf();
        var token = jwt.encode({
            user: username,
            exp: expires
        }, config.get('jwtTokenSecret'));

        response.json({
            token: token
        })
    } else {
        var error = new Error('Unauthorized');
        error.status = 401;
        next(err);
    }
})

//dogs
router.use('/dogs', require('./dogs'));
module.exports = router;

