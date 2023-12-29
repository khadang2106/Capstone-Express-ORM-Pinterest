import express from 'express';
import {
  getComment,
  getImgInfo,
  getImgList,
  getImgSaveStatus,
  leaveComment,
  saveImg,
  searchImg,
} from '../controllers/imageController.js';
import { verifyToken } from '../config/jwt.js';

const imageRoute = express.Router();

imageRoute.get('/get-img-list', verifyToken, getImgList);

imageRoute.get('/search-img/:keyword', verifyToken, searchImg);

imageRoute.get('/get-img-info/:id', verifyToken, getImgInfo);

imageRoute.get('/get-comment/:id', verifyToken, getComment);

imageRoute.post('/leave-comment', verifyToken, leaveComment);

imageRoute.post('/save-img/:id', verifyToken, saveImg);

imageRoute.get('/get-img-save-status/:id', verifyToken, getImgSaveStatus);

export default imageRoute;
