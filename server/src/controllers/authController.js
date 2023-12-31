import bcrypt from 'bcrypt';
import { responseData } from '../utils/response.js';
import { prisma } from '../config/connect.js';
import {
  checkRefToken,
  checkToken,
  createRefToken,
  createToken,
  decodeToken,
} from '../config/jwt.js';

export const register = async (req, res) => {
  try {
    const { email, mat_khau, ho_ten, tuoi } = req.body;

    const checkUser = await prisma.nguoi_dung.findFirst({
      where: { email },
    });

    if (checkUser) {
      responseData(res, 'Email existed', '', 400);
      return;
    }

    const newUser = {
      email,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      ho_ten,
      tuoi,
      anh_dai_dien: '',
    };

    await prisma.nguoi_dung.create({ data: newUser });

    responseData(res, 'Register Successfully', '', 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, mat_khau } = req.body;

    const checkUser = await prisma.nguoi_dung.findFirst({
      where: { email },
    });

    if (checkUser) {
      if (bcrypt.compareSync(mat_khau, checkUser.mat_khau)) {
        const key = new Date().getTime();

        const token = createToken({
          nguoi_dung_id: checkUser.nguoi_dung_id,
          key,
        });
        const refreshToken = createRefToken({
          nguoi_dung_id: checkUser.nguoi_dung_id,
          key,
        });

        await prisma.nguoi_dung.update({
          data: { refresh_token: refreshToken },
          where: {
            nguoi_dung_id: checkUser.nguoi_dung_id,
          },
        });

        const userData = {
          nguoi_dung_id: checkUser.nguoi_dung_id,
          email: checkUser.email,
          ho_ten: checkUser.ho_ten,
          anh_dai_dien: checkUser.anh_dai_dien,
          token,
        };

        responseData(res, 'Login Successfully', userData, 200);
      } else {
        responseData(res, 'Incorrect Password', '', 400);
      }
    } else {
      responseData(res, 'Incorrect Email', '', 400);
    }
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const tokenRef = async (req, res) => {
  try {
    const { token } = req.headers;

    const check = checkToken(token);
    if (check !== null && check.name !== 'TokenExpiredError') {
      return res.status(401).send(check.name);
    }

    const userInfoToken = decodeToken(token);
    const { nguoi_dung_id } = userInfoToken.data;

    const getUser = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id,
      },
    });

    const checkRef = checkRefToken(getUser.refresh_token);
    if (checkRef !== null) {
      return res.status(401).send(checkRef.name);
    }

    const refToken = decodeToken(getUser.refresh_token);
    if (userInfoToken.data.key !== refToken.data.key) {
      return res.status(401).send(check.name);
    }

    const newToken = createToken({
      nguoi_dung_id: getUser.nguoi_dung_id,
      key: refToken.data.key,
    });

    responseData(res, 'Successfully', newToken, 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};

export const logout = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfoToken = decodeToken(token);
    const { nguoi_dung_id } = userInfoToken.data;

    const getUser = await prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id,
      },
    });

    await prisma.nguoi_dung.update({
      data: { refresh_token: '' },
      where: {
        nguoi_dung_id: getUser.nguoi_dung_id,
      },
    });

    responseData(res, 'Logout Successfully', '', 200);
  } catch {
    responseData(res, 'Error...', '', 500);
  }
};
