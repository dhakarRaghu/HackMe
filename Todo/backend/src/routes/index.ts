import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './user';

const appRoutes = express.Router();

appRoutes.use(express.json());

appRoutes.use('/user', userRoutes);

export default appRoutes