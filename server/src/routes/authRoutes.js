import express from 'express';
import {
  login,
  logout,
  register,
  tokenRef,
} from '../controllers/authController.js';

const authRoute = express.Router();

authRoute.post('/register', register);

authRoute.post('/login', login);

authRoute.post('/logout', logout);

authRoute.post('/token-ref', tokenRef);

export default authRoute;
