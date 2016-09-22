var express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    cors = require('cors'),
    app = express();

//configura o servidor para entender os verbos de requisição
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

//body parser para requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//CORS
app.use(cors());

//lidar com request do favicon
app.use(function(request, response, next){
    if(request.url === '/favicon.ico')  {
        response.writeHead(200, {'Content-Type': 'image/x-icon'});
        response.end('');
    } else {
        next();
    }
})

app.use(passport.initialize());
passport.use(
    new BasicStrategy(function(username, password, done){
        if(username.valueOf() === 'admin' && password.valueOf() === '7488yn2w') {
            return done(null, true);
        } else {
            return done(null, false);
        }
    })
)

//router
app.use('/', require('./routes'));

//tratamento de erro
app.use(function(request, response, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use(function(err, request, response, next){
    console.log(err.stack);
    response.status(err.status || 500).json({err: err.message});
})
    
//server listener
module.exports = app;