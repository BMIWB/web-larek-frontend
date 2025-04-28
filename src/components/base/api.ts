import { ApiPostMethods } from '../../types/index';

// Тип ответа для списка элементов
export type ApiListResponse<Type> = {
  total: number;
  items: Type[];
};

// Базовый класс для работы с API
export class Api {
  readonly baseUrl: string;
  protected options: RequestInit;

  constructor(baseUrl: string, options: RequestInit = {}) {
    this.baseUrl = baseUrl;
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers as object ?? {}),
      },
    };
  }

  protected handleResponse(response: Response): Promise<object> {
    if (response.ok) {
      return response.json();
    }

    return response.json().then((data) =>
      Promise.reject(data.error ?? response.statusText)
    );
  }

  get(uri: string) {
    return fetch(this.baseUrl + uri, {
      ...this.options,
      method: 'GET',
    }).then(this.handleResponse);
  }

  post(uri: string, data: object, method: ApiPostMethods = 'POST') {
    return fetch(this.baseUrl + uri, {
      ...this.options,
      method,
      body: JSON.stringify(data),
    }).then(this.handleResponse);
  }
}
