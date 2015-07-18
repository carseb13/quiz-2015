var express = require('express');
var router = express.Router();
//se importa el controller para las acciones del quiz.
var quizController  = require('../controllers/quiz_controller');
/* GET home page. */
router.get('/', function(req, res) {
	//se enruta la salida para la raiz del sitio
  res.render('index', { title: 'QUIZ 2015' });
});

//se configura que la ruta quizes/question sera manejada con el controlador quizController
router.get('/quizes/question',quizController.question);
router.get('/quizes/answer',quizController.answer);
module.exports = router;
