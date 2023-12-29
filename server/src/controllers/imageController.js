import { responseData } from '../utils/response.js';
import { prisma } from '../config/connect.js';
import { decodeToken } from '../config/jwt.js';

export const getImgList = async (req, res) => {
  try {
    const data = await prisma.hinh_anh.findMany({
      where: {
        deleted_at: null,
      },
    });

    responseData(res, 'Get Image List Successfully', data, 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const searchImg = async (req, res) => {
  try {
    const { keyword } = req.params;

    const data = await prisma.hinh_anh.findMany({
      where: {
        deleted_at: null,
        ten_hinh: {
          contains: keyword,
        },
      },
    });

    responseData(res, 'Get Image List Successfully', data, 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const getImgInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: id * 1,
      },
      include: {
        nguoi_dung: {
          select: {
            nguoi_dung_id: true,
            ho_ten: true,
            anh_dai_dien: true,
          },
        },
      },
    });

    if (data.deleted_at !== null) {
      return responseData(
        res,
        'Image deleted',
        `Deleted at: ${data.deleted_at}`,
        200
      );
    }

    responseData(res, 'Get Image Info Successfully', data, 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const getComment = async (req, res) => {
  try {
    const { id } = req.params;

    const checkImg = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: id * 1,
      },
    });

    if (checkImg.deleted_at !== null) {
      return responseData(
        res,
        'Image deleted',
        `Deleted at: ${checkImg.deleted_at}`,
        200
      );
    }

    const data = await prisma.binh_luan.findMany({
      where: {
        hinh_id: id * 1,
      },
      include: {
        nguoi_dung: {
          select: {
            nguoi_dung_id: true,
            ho_ten: true,
            anh_dai_dien: true,
          },
        },
      },
    });

    responseData(res, 'Get Comment Successfully', data, 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const leaveComment = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { nguoi_dung_id } = userInfo.data;

    const { hinh_id, noi_dung } = req.body;

    const newData = {
      nguoi_dung_id,
      hinh_id,
      ngay_binh_luan: new Date(),
      noi_dung,
    };

    await prisma.binh_luan.create({ data: newData });

    responseData(res, 'Comment Successfully', '', 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const saveImg = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { nguoi_dung_id } = userInfo.data;

    const { id } = req.params;

    const checkImg = await prisma.hinh_anh.findFirst({
      where: {
        hinh_id: id * 1,
      },
    });

    if (checkImg.deleted_at !== null) {
      return responseData(
        res,
        'Image deleted',
        `Deleted at: ${checkImg.deleted_at}`,
        200
      );
    }

    const isSave = await prisma.luu_anh.findFirst({
      where: {
        nguoi_dung_id,
        hinh_id: id * 1,
      },
    });

    if (isSave) {
      await prisma.luu_anh.delete({
        where: {
          nguoi_dung_id_hinh_id: {
            nguoi_dung_id,
            hinh_id: id * 1,
          },
        },
      });

      responseData(res, 'Unsave Image Successfully', '', 200);
    } else {
      const newData = {
        nguoi_dung_id,
        hinh_id: id * 1,
        ngay_luu: new Date(),
      };

      await prisma.luu_anh.create({ data: newData });

      responseData(res, 'Save Image Successfully', '', 200);
    }
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const getImgSaveStatus = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { nguoi_dung_id } = userInfo.data;

    const { id } = req.params;

    const isSave = await prisma.luu_anh.findFirst({
      where: {
        nguoi_dung_id,
        hinh_id: id * 1,
      },
    });

    if (isSave) {
      if (isSave.deleted_at !== null) {
        return responseData(
          res,
          'Image deleted',
          `Deleted at: ${isSave.deleted_at}`,
          200
        );
      }

      responseData(res, 'Success', !!isSave, 200);
    } else {
      responseData(res, 'Data not found', '', 404);
    }
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};
