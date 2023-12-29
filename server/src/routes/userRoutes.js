import express from 'express';
import {
  deleteImg,
  getCreatedImg,
  getSavedImg,
  getUserInfo,
  updateUserInfo,
  uploadImg,
} from '../controllers/userController.js';
import { verifyToken } from '../config/jwt.js';
import uploadCloud from '../utils/uploadCloud.js';

const userRoute = express.Router();

userRoute.get('/get-user-info', verifyToken, getUserInfo);

userRoute.get('/get-saved-img-by-user-id', verifyToken, getSavedImg);

userRoute.get('/get-created-img-by-user-id', verifyToken, getCreatedImg);

userRoute.delete('/delete-img/:id', verifyToken, deleteImg);

userRoute.post(
  '/upload-img',
  verifyToken,
  uploadCloud.single('image'),
  uploadImg
);

userRoute.put('/update-user-info', verifyToken, updateUserInfo);

export default userRoute;
