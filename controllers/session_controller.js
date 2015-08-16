var models = require('../models/models');

exports.loginRequired = function(req,res,next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
}

//new: muestra el form de alta
exports.new		= function(req,res){
	var errors = req.session.errors || {};
	req.session.errors={};
	res.render('sessions/new',{errors: errors});
}
//se encarga de crear una nueva instancia
exports.create	= function(req,res){
	var login = req.body.login;
	var password = req.body.password;

	var userController= require('./user_controller');
	userController.autenticar(login,password,function(error,user){
		if(error){ //Si existe error de sesion enviamos un mensaje de error
			req.session.error =[{'message':'Se ha producido un error: '+error}];
			res.redirect('/login');
			return;
		}
		req.session.user={id:user.id,username:user.username};
		//redirecciona a path anterior a login
		res.redirect(req.session.redir.toString());
	});
}
//aplica el borrado de una instancia
exports.destroy = function(req,res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());//redirect al path anterior a login
}