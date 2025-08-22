import {Router} from 'express';
import { crearUsuario , consultarUsuarios , consultarUsuario , actualizarUsuario , borrarUsuario } from '../controllers/user.controllers'

const router = Router()

router.post('/users', crearUsuario);

router.get('/users', consultarUsuarios);

router.get('/users/:id', consultarUsuario);

router.put('/users/:id', actualizarUsuario);

router.delete('/users/:id', borrarUsuario);

export default router
