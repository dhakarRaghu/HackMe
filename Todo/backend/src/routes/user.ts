import { Router } from 'express';
import { createUser, LoginUser } from '../controllers/User';

const userRoutes = Router();

userRoutes.post('/login', LoginUser);
userRoutes.post('/signup', createUser);

export default userRoutes;
