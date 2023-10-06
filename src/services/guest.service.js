import httpService from './http.service';
import { ROUTES } from '../utils/static';

class GuestService {
  static client = httpService;

  static addGuest = async (email) => {
    const response = await this.client.request({
      url: ROUTES.GUEST,
      data: email,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };

  static delete = async (id) =>
    this.client.request({
      url: `${ROUTES.GUEST}/${id}`,
      method: 'DELETE',
    });
}

export default GuestService;
