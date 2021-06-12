// importando el router de Home
import homeRouter from './home';
// importando Router de User
import userRouter from './users';
// Agregando  las rutas  a la aplicacion
const addRoutes = (app) => {
  app.use('/', homeRouter);
  app.use('/', userRouter);
  return app;
};

export default {
  addRoutes,
};
