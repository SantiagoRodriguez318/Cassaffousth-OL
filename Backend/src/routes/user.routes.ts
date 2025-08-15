import {Router} from 'express';
import { createUser , deleteUser, getUser, getUsers , updateUser } from '../controllers/user.controllers'
//import { rolmiddleware } from '../middleware/rol.middleware';
const router = Router()

router.post('/users', createUser);

router.get('/users', getUsers);

router.get('/users/:id', getUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

export default router