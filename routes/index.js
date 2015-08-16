var express = require('express');
var router = express.Router();
//se importa el controller para las acciones del quiz.
var quizController  	= require('../controllers/quiz_controller');
var commentController  	= require('../controllers/comment_controller');
var sessionController	= require('../controllers/session_controller');
var	userController		= require('../controllers/user_controller');
/* GET home page. */
router.get('/', function(req, res) {
	//se enruta la salida para la raiz del sitio
  res.render('index', { 
  	title: 'QUIZ 2015',
  	errors: []
  });
});
//Autoload de comandos con :quizId
router.param('quizId',quizController.load); //autoload :quizId
router.param('commentId',commentController.load);//autoload :commentId

//router para la pagina del autor
router.get('/author',function(req,res){
	res.render('author',{app_title: 'Quiz 2015 - Cesquivel',errors:[]});
});

//se configura que la ruta quizes/question sera manejada con el controlador quizController
router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);

//rutas de quiz para CRUD
router.get('/quizes/new',sessionController.loginRequired,quizController.new);
router.post('/quizes/create',sessionController.loginRequired,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired,quizController.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired,quizController.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired,quizController.destroy);
//fin CRUD

//rutas de comment para CRUD
router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',commentController.publish);
//fin CRUD

//rutas de session para CRUD
router.get('/login',sessionController.new);// formulario de login
router.post('/login',sessionController.create);// crear session
router.get('/logout',sessionController.destroy);// destruir session
//fin CRUD

module.exports = router;