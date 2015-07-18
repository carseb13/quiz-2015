//se exporta y disponibiliza los metodos question y answer
exports.question= function(req,res){
	res.render('quizes/question',{pregunta: 'Capital de Italia'});
	//res.send('<h1>Y DESPUESSS!?!?!?</h1>');
}

exports.answer= function(req,res){
	
	if(req.query.respuesta.toLowerCase()==='roma'){
		res.render('quizes/answer',{respuesta:'Correcto'});				
	}else{
		res.render('quizes/answer',{respuesta:'Incorrecto'});				
	}	


}

