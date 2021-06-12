import { Router } from 'express';
// Importando el controlador
import userController from '../controllers/userController';
// Crenado instancia  de Router
const router = new Router();
// GET users listing
router.get('/', userController.index);
export default router;
