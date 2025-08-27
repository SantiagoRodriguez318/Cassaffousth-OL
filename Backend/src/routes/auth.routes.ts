import { Router } from 'express';
import { Registro, Login , userInfo} from '../controllers/auth.controller';
import { VerifyToken } from '../middlewares/auth.middleware';
import { validateEmail, validatePhone } from '../middlewares/user.middleware';

const router = Router();

router.post('/registro', validateEmail, validatePhone, Registro);
router.post('/login', validateEmail, Login);
router.get('/perfil', VerifyToken, userInfo)

export default router

