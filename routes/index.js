var express = require('express');
var router = express.Router();
//se importa el controller para las acciones del quiz.
var quizController  = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
	//se enruta la salida para la raiz del sitio
  res.render('index', { 
  	title: 'QUIZ 2015',
  	errors: []
  });
});
//Autoload de comandos con :quizId
router.param('quizId',quizController.load); //autoload

//se configura que la ruta quizes/question sera manejada con el controlador quizController
//router.get('/quizes/question',quizController.index);
router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/author',function(req,res){
	res.render('author',{app_title: 'Quiz 2015 - Cesquivel',errors:[]});
});
//rutas de quiz para CRUD
router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',quizController.edit);
router.put('/quizes/:quizId(\\d+)',quizController.update);
router.delete('/quizes/:quizId(\\d+)',quizController.destroy);
//fin CRUD
module.exports = router;
