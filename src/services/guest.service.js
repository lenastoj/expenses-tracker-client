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

  static deleteGuest = async (id) =>
    this.client.request({
      url: `${ROUTES.GUEST}/${id}`,
      method: 'DELETE',
    });

  static deleteHost = async (id) =>
    this.client.request({
      url: `${ROUTES.HOST}/${id}`,
      method: 'DELETE',
    });

  static getGuests = async ({
    page = '1',
    searchQuery,
    sort,
    sortDirection,
  }) => {
    const paramsGuest = {
      page,
      ...(searchQuery && { searchQuery }),
      ...(sort && { sort }),
      ...(sortDirection && { sortDirection }),
    };

    const response = await this.client.request({
      url: ROUTES.GUEST,
      params: paramsGuest,
      method: 'GET',
    });
    return response;
  };
}

export default GuestService;
