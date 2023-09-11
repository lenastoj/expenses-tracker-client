import httpService from './http.service';
import { ROUTES } from '../utils/static';

class ExpenseService {
  static client = httpService;

  // static getAll = async (page) => {
  //   const response = await this.client.request({
  //     url: ROUTES.EXPENSES,
  //     params: { page },
  //     method: 'GET',
  //   });
  //   return response;
  // };
  static getAll = async ({ page, word, sort, order, month }) => {
    const paramsUser = {
      page,
      ...(word && { word }),
      ...(month && { month }),
      ...(sort && { [sort]: order }),
    };
    const response = await this.client.request({
      url: ROUTES.EXPENSES,
      params: paramsUser,
      method: 'GET',
    });
    return response;
  };

  static get = async (id) =>
    this.client.request({
      url: `${ROUTES.EXPENSES}/${id}`,
      method: 'GET',
    });

  static create = async (formData) =>
    this.client.request({
      url: ROUTES.EXPENSES,
      data: formData,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  static edit = async (id, formData) =>
    this.client.request({
      url: `${ROUTES.EXPENSES}/${id}`,
      data: formData,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  static delete = async (id) =>
    this.client.request({
      url: `${ROUTES.EXPENSES}/${id}`,
      method: 'DELETE',
    });
}

export default ExpenseService;
