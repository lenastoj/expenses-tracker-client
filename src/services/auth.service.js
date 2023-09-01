import httpService from './http.service';
import ROUTES from '../utils/static';

class AuthService {
  static client = httpService;

  static login = async (credentials) => {
    const response = await this.client.request({
      url: ROUTES.LOGIN,
      data: credentials,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };

  static logout = async () => {
    const response = await this.client.request({
      url: ROUTES.LOGOUT,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };

  static activeUser = async () => {
    const response = await this.client.request({
      url: ROUTES.USER,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };
}

export default AuthService;
