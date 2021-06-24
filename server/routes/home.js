// importando router
import { Router } from 'express';
/** Importando el Home Controler */

import homeController from '@server/controllers/homeController';

// creando la instancia de un router
const router = new Router();

// GET
router.get(['/', '/index'], homeController.index);

// GET '/greeeting'
router.get('/greeting', homeController.greeting);

// GET '/about'
router.get('/about', homeController.about);

/**  exportando el router que maneja las subrutas */
export default router;
