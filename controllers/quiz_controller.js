var models = require('../models/models.js');
//se exporta y disponibiliza los metodos question y answer
exports.load=function(req,res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();
			}else{
				next(new Error('No existe quizId='+quizId));
			}
		}).catch(function(error){ 
			next(error);
		});
}

//get /quizes
exports.index=function(req,res){
	var filtro={order: 'pregunta ASC'};
	if(req.query.search){
		var valor = '%'+req.query.search.trim().replace(' ','%')+'%';
		filtro.where=["pregunta like ?",valor];
	}
	
	models.Quiz.findAll(filtro).then(function(quizes){
		res.render('quizes/index.ejs',{quizes:quizes});
	});
}

exports.show= function(req,res){
	res.render('quizes/show',{quiz:req.quiz});
}

exports.question= function(req,res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question',{
			pregunta: quiz[0].pregunta
		});
	});
}

exports.answer= function(req,res){
	var resultado='Incorrecto';
	if(req.query.respuesta===req.quiz.respuesta){
		resultado='Correcto';
	}
	res.render('quizes/answer',{quiz:req.quiz,respuesta:resultado});
}
