var path=require('path');

var url 		= process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name 	= (url[6]||null);
var user 		= (url[2]||null);
var pwd 		= (url[3]||null);
var protocol 	= (url[1]||null);
var dialect 	= (url[1]||null);
var port 		= (url[5]||null);
var host		= (url[4]||null);
var storage		= process.env.DATABASE_STORAGE;

//Cargar modulo ORM
var Sequelize = require('sequelize');

//usar DB SQLite
var sequelize = new Sequelize(DB_name,user,pwd,{
	dialect:protocol,
	protocol:protocol,
	port: port,
	host: host, 
	storage:storage, //solo para Sqlite (.env)
	omitNull:true //solo para Postgres
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
