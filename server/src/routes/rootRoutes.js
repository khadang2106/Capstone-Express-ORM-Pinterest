import express from 'express';
import authRoute from './authRoutes.js';
import imageRoute from './imageRoutes.js';
import userRoute from './userRoutes.js';

const rootRoute = express.Router();

rootRoute.use('/auth', authRoute);

rootRoute.use('/image', imageRoute);

rootRoute.use('/user', userRoute);

export default rootRoute;
