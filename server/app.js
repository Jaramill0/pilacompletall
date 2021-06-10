import webpack from 'webpack';

// Webpack Modules
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// eslint-disable-next-line import/no-unresolved
import configTemplateEngine from '@s-config/template-engine';
// eslint-disable-next-line import/no-unresolved
import winston from '@server/config/winston';
import webpackDevConfig from '../webpack.dev.config';

// Importando configurations
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// eslint-disable-next-line import/no-unresolved
const indexRouter = require('@s-rutas/index');
// eslint-disable-next-line import/no-unresolved
const usersRouter = require('@s-rutas/users');

// Consultar el modo en que se esta ejecutando la aplicacion
const env = process.env.NODE_ENV || 'development';

// se crea la aplicación express
const app = express();
// verificando el modo de ejecucion de la aplicacion
if (env === 'development') {
  // eslint-disable-next-line no-console
  console.log('Ejecutando en modo desarrollo: WebPack Hot Reloading');
  // PASO 1.-agregando la ruta del   HMR
  // reload=true : habilita la recarga del Front-End cuando hay cambios en el codigo fuente del Front-End
  // Timeout=1000: Tiempo de espera entre recarga y recargar de la pagina
  webpackDevConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackDevConfig.entry,
  ];

  // PASO 2.- Agregamos el Plugin
  webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // PASO 3.- Crear el Compilador de WebPack
  const compiler = webpack(webpackDevConfig);

  // PASO 4.- Agregando el Middleware a la cadena de middlewares de la aplicacion
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
    }),
  );

  // PASO 5.- Agregando el Webpack Hot Middleware
  app.use(webpackHotMiddleware(compiler));
} else {
  // eslint-disable-next-line no-console
  console.log('Ejecutando en modo Produccion...');
}

// view engine setup
configTemplateEngine(app);
// se hace entre el elemento exite el middleware hace directamente la peticion
app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// se insertar express diversos modulos para espesificar la ruta = public
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
