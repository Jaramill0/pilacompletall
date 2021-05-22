var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('@s-rutas/index');
var usersRouter = require('@s-rutas/users');

// Webpack Modules
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../webpack.dev.config';
import webpackConfig from '../webpack.dev.config';

// Consultar el modo en que se esta ejecutando la aplicacion
const env = process.env.NODE_ENV || 'development';

// se crea la aplicación express
var app = express();
// verificando el modo de ejecucion de la aplicacion
if(env === 'development'){
  console.log('Ejecutando en modo desarrollo: WebPack Hot Reloading');
  //PASO 1.-agregando la ruta del   HMR
  // reload=true : habilita la recarga del Front-End cuando hay cambios en el codigo fuente del Front-End
  // Timeout=1000: Tiempo de espera entre recarga y recargar de la pagina
  webpackConfig.entry = ['webpack-hot-middleware/client?reload=true&timeout=1000', webpackConfig.entry];

  // PASO 2.- Agregamos el Plugin 
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  //PASO 3.- Crear el Compilador de WebPack
  const compiler = webpack(webpackConfig);

  //PASO 4.- Agregando el Middleware a la cadena de middlewares de la aplicacion
  app.use(webpackDevMiddleware(compiler,{
    publicPath: webpackDevConfig.output.publicPath
  }));

  //PASO 5.- Agregando el Webpack Hot Middleware
  app.use(webpackHotMiddleware(compiler));
}else{
  console.log("Ejecutando en modo Produccion...");
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// se hace entre el elemento exite el middleware hace directamente la peticion
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// se insertar express diversos modulos para espesificar la ruta = public
app.use(express.static(path.join(__dirname,'..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
