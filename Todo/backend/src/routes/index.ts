import express from 'express';
import userRoutes from './user';
import todoRoutes from './todo';

const appRoutes = express.Router();

appRoutes.use('/user', userRoutes);
appRoutes.use('/todo', todoRoutes);

export default appRoutes;
