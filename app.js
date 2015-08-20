var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser'); //importar
var bodyParser      = require('body-parser');    // paquetes
var partials        = require('express-partials'); //con middlewares.
var methodOverride  = require('method-override');
var session         = require('express-session');
var routes          = require('./routes/index'); //importar enrutadores
var app             = express(); //se crea nueva aplicacion express

// view engine setup
app.set('views', path.join(__dirname, 'views')); //instalar el generador de vistas
app.set('view engine', 'ejs'); //generador de vistas EJS (Embebed javaScript)
app.use(partials());
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json()); //instalar middlewares
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('Quiz_2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    if(!req.path.match(/\/login|\/logout/)){
        req.session.redir=req.path;
    }
    res.locals.session = req.session;

    if(req.session.user){
        if(req.session.login_time){
            var lapso =(new Date()).getTime() - req.session.login_time.getTime();
            if(lapso > 120000){
                res.redirect('/logout');
                return;
            }
        }else{
            req.session.login_time = new Date();
        }
    }
    next();
});
app.use('/', routes); //instalar enrutadores
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    /*para el resto de las rutas desconocidas, se genera error 404 de HTTP*/
    var err = new Error('Not Found'); 
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
     /* control de errores para el ambiente de desarrollo*/
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*gestion de errores para ambiente de produccion*/
    res.render('error', {
        message: err.message,
        error: {},
        errors:[]
    });
});

//se exporta la app para el comando de arranque
module.exports = app;
