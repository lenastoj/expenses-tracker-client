import httpService from './http.service';
import { ROUTES } from '../utils/static';

class ExpenseService {
  static client = httpService;

  static getAll = async ({
    page,
    id,
    searchQuery,
    sort,
    order,
    month,
    startDate,
    endDate,
  }) => {
    const paramsUser = {
      page,
      id,
      ...(searchQuery && { searchQuery }),
      ...(month && { month }),
      ...(sort && { sort }),
      ...(order && { order }),
      ...(startDate && endDate && { startDate, endDate }),
    };
    const response = await this.client.request({
      url: ROUTES.EXPENSES,
      params: paramsUser,
      method: 'GET',
    });
    return response;
  };

  static getExpensesToPrint = async ({
    id,
    week,
    searchQuery,
    sort,
    order,
    startDate,
    endDate,
  }) => {
    const paramsUser = {
      id,
      ...(searchQuery && { searchQuery }),
      ...(sort && { sort }),
      ...(order && { order }),
      ...(startDate && endDate && { startDate, endDate }),
    };
    return this.client.request({
      url: ROUTES.EXPENSES_PRINT,
      params: week ? { id, week } : paramsUser,
      method: 'GET',
    });
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
