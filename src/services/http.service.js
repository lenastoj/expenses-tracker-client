import axios from 'axios';

class HttpService {
  client;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8000/api',
      withCredentials: true,
    });
  }

  request = (requestConfig) =>
    this.client.request(requestConfig).then(({ data }) => data);
}

const httpService = new HttpService();
export default httpService;
