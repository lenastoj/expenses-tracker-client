import ROUTES from '../utils/static';
import httpService from './http.service';

class ExpenseService {
  static client = httpService;

  static getAll = async () =>
    this.client.request({
      url: ROUTES.EXPENSES,
      method: 'GET',
    });

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
