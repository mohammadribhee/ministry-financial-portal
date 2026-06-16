import api from "./api";

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (): Promise<T[]> => {
    const response = await api.get<T[]>(this.endpoint);
    return response.data;
  };

  post = async <R = T>(data: unknown): Promise<R> => {
    const response = await api.post<R>(this.endpoint, data);
    return response.data;
  };
}

export default APIClient;