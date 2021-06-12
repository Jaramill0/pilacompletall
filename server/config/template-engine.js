import exphbs from 'express-handlebars';
import path from 'path';
// primero  se exporta una funcion de configuracion
export default (app) => {
  // Registrar el motor de plantillas
  app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main' }));
  // 2. Selecciona el motor de plantillas Recien Registro
  app.set('view engine', 'hbs');
  // 3. Establecer la ruta de las vistas
  app.set('views', path.join(__dirname, '..', 'views'));
  return app;
};
