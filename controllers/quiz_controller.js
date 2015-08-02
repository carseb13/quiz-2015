var models = require('../models/models.js');
//se exporta y disponibiliza los metodos question y answer
exports.question= function(req,res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question',{
			pregunta: quiz[0].pregunta
		});
	});
}

exports.answer= function(req,res){
	
	models.Quiz.findAll().success(function(quiz){
		if(req.query.respuesta===quiz[0].respuesta){
			res.render('quizes/answer',{respuesta:'Correcto'});				
		}else{
			res.render('quizes/answer',{respuesta:'Incorrecto'});				
		}	
	});
}


