// importando router
import { Router } from 'express';
/** Importando el Home Controler */
// eslint-disable-next-line import/no-unresolved
import homeController from '@server/controllers/homeController';

// creando la instancia de un router
const router = new Router();

// GET
router.get('/', homeController.index);

// GET '/greeeting'
router.get('/greeting', homeController.greeting);
/**  exportando el router que maneja las subrutas */
export default router;
