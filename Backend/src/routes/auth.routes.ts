import { Router } from 'express';
import { Registro, Login } from '../controllers/auth.controller';

const router = Router();

router.post('/registro', Registro);
router.post('/login', Login);

export default router

