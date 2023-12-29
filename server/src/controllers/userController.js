import { responseData } from '../utils/response.js';
import { prisma } from '../config/connect.js';
import { decodeToken } from '../config/jwt.js';
import { v2 as cloudinary } from 'cloudinary';

export const getUserInfo = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { nguoi_dung_id } = userInfo.data;

    const userData = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id,
      },
      select: {
        nguoi_dung_id: true,
        email: true,
        ho_ten: true,
        tuoi: true,
        anh_dai_dien: true,
      },
    });

    responseData(res, 'Get User Info Successfully', userData, 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const getSavedImg = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { nguoi_dung_id } = userInfo.data;

    const data = await prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id,
        deleted_at: null,
      },
      include: {
        hinh_anh: true,
      },
    });

    responseData(res, 'Get Images Successfully', data, 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const getCreatedImg = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { nguoi_dung_id } = userInfo.data;

    const data = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id,
        deleted_at: null,
      },
    });

    responseData(res, 'Get Images Successfully', data, 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const deleteImg = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { nguoi_dung_id } = userInfo.data;

    const { id } = req.params;

    const img = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: id * 1,
      },
    });

    if (!img) {
      return responseData(res, 'Image not found', '', 404);
    }

    if (nguoi_dung_id !== img.nguoi_dung_id) {
      return responseData(res, 'Permission denied', '', 403);
    }

    const deletedRecord = await prisma.hinh_anh.update({
      where: {
        hinh_id: id * 1,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    await prisma.luu_anh.updateMany({
      where: {
        hinh_id: id * 1,
      },
      data: {
        deleted_at: new Date(),
      },
    });

    responseData(res, 'Success', `Deleted at ${deletedRecord.deleted_at}`, 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const uploadImg = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { nguoi_dung_id } = userInfo.data;

    const { ten_hinh, mo_ta } = req.body;

    const newImg = {
      nguoi_dung_id,
      ten_hinh,
      mo_ta,
      duong_dan: req.file.path,
    };

    await prisma.hinh_anh.create({ data: newImg });

    responseData(res, 'Success', '', 200);
  } catch (error) {
    console.log(error);
    responseData(res, 'Error...', '', 500);
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { nguoi_dung_id } = userInfo.data;

    const { ho_ten, tuoi } = req.body;

    const getUser = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id,
      },
    });

    await prisma.nguoi_dung.update({
      data: {
        ho_ten,
        tuoi,
      },
      where: {
        nguoi_dung_id,
      },
    });

    responseData(res, 'Update Successfully', '', 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};
