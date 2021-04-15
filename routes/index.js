var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,author: 'Hugo Jaramillo', appname: 'Web Development', company: 'Super Root'});
});
/*Agregando Nueva Ruta*/
router.get('/greeting',function(req, res, next){
  res.send('Hola Jaramillo Web')
})
/*Ruta Creada */
router.get('/direccion',function(req,res,next){
  res.send('Programacion Web en Pila Completa II')
})
module.exports = router;
