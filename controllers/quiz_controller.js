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
		res.render('quizes/index.ejs',{quizes:quizes,errors:[]});
	});
}

exports.show= function(req,res){
	res.render('quizes/show',{	
		quiz:req.quiz,
		errors:[]
	});
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
	res.render('quizes/answer',{	
		quiz:req.quiz,
		respuesta:resultado,
		errors:[]
	});
}

exports.new = function(req,res){
	//do something here
	var quiz = models.Quiz.build({
		pregunta:"Pregunta",
		respuesta:"Respuesta"
	});
	res.render('quizes/new',{	
		quiz:quiz,
		errors:[]
	});
}
exports.create = function(req,res){
	//do something here
	var quiz= models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new',{	
				quiz:quiz, 
				errors:err.errors
			});
		}else{
			quiz.save({fields:["pregunta","respuesta"]}).then(function(){
				res.redirect('/quizes');
			});
		}
	});
}

exports.edit= function(req,res){
	//do something
	var quiz = req.quiz; //instancia de quiz creada con autoload
	res.render('quizes/edit',{
		quiz:quiz,
		errors:[]
	});
}

exports.update =function(req,res){
	req.quiz.pregunta 	= 	req.body.quiz.pregunta;
	req.quiz.respuesta 	=	req.body.quiz.respuesta;
	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/edit',{
				quiz:req.quiz,
				errors:err.errors
			});
		}else{
			req.quiz.save({ fields:["pregunta","respuesta"]}).then(
				function(){
					res.redirect('/quizes');
				});
		}
	});	
}

exports.destroy = function(req,res){
	req.quiz.destroy().then(function(req,res){
		req.quiz.destroy().then(function(){
			res.redirect('/quizes');
		}).catch(function(error){
			next(error);
		});
	});
}