import jwt from 'jsonwebtoken';

export const createToken = (data) => {
  return jwt.sign({ data }, 'PINTEREST', {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
};

export const decodeToken = (token) => jwt.decode(token);

export const checkToken = (token) =>
  jwt.verify(token, 'PINTEREST', (error, decoded) => error);

export const verifyToken = (req, res, next) => {
  const { token } = req.headers;

  const check = checkToken(token);

  if (check == null) {
    next();
  } else {
    res.status(401).send(check.name);
  }
};

export const createRefToken = (data) => {
  return jwt.sign({ data }, 'NEW_PINTEREST', {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
};

export const checkRefToken = (token) =>
  jwt.verify(token, 'NEW_PINTEREST', (error, decoded) => error);
