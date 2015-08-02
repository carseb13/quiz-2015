var path=require('path');
//Cargar modulo ORM
var Sequelize = require('sequelize');

//usar DB SQLite
var sequelize = new Sequelize(null,null,null,{
	dialect:"sqlite",
	storage:"quiz.sqlite"
});

//importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//exportar la definicion de la tabla Quiz
exports.Quiz=Quiz;

//sequelize.sync() crea e inicia la tabla Quiz en la BD
sequelize.sync().success(function(){
	Quiz.count().success(function(count){
		if(count===0){
			Quiz.create({
				pregunta:'Capital de Italia',
				respuesta:'Roma'
			}).success(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});
