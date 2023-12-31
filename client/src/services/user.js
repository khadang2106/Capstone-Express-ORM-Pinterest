import { request } from '../configs/api';

class UserService {
  loginApi(data) {
    return request({
      url: '/auth/login',
      method: 'POST',
      data,
    });
  }

  signUpApi(data) {
    return request({
      url: '/auth/register',
      method: 'POST',
      data,
    });
  }
}

export const userService = new UserService();
