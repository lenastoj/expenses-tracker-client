import httpService from './http.service';
import { ROUTES } from '../utils/static';

class ExpenseService {
  static client = httpService;

  static getAll = async ({
    page,
    id,
    word,
    sort,
    order,
    month,
    startDate,
    endDate,
  }) => {
    const paramsUser = {
      page,
      id,
      ...(word && { word }),
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

  static getWeekExpenses = async (id) => {
    return this.client.request({
      url: ROUTES.EXPENSES_WEEK,
      params: id,
      method: 'GET',
    });
  };

  static getExpensesToPrint = async ({
    id,
    word,
    sort,
    order,
    startDate,
    endDate,
  }) => {
    const paramsUser = {
      id,
      ...(word && { word }),
      ...(sort && { sort }),
      ...(order && { order }),
      ...(startDate && endDate && { startDate, endDate }),
    };
    return this.client.request({
      url: ROUTES.EXPENSES_PRINT,
      params: paramsUser,
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
