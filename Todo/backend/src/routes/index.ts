import express from 'express';
import userRoutes from './user';

const appRoutes = express.Router();

appRoutes.use('/user', userRoutes);

export default appRoutes;
