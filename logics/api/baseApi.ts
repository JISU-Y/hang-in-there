import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';

import { COOKIE_KEY } from '@domains/common/constants/cookieKeys';

import { setupInterceptors } from './interceptors';

type ApiVersionType = 'v1';

export interface ApiRequestConfig extends AxiosRequestConfig {
  isAuthRequired?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT;

export default class BaseApi {
  client: AxiosInstance;

  constructor(baseUrl: string, version: ApiVersionType = 'v1') {
    this.client = axios.create({
      baseURL: `${BASE_URL}/${version}${baseUrl}`
    });

    // NOTE: 토큰 재발급 요청을 위한 interceptor 설정
    setupInterceptors(this.client);
  }

  addAuthHeader(config: ApiRequestConfig = {}) {
    const authToken = getCookie(COOKIE_KEY.ACCESS_TOKEN);
    const { isAuthRequired = true, ...axiosConfig } = config;
    return {
      ...axiosConfig,
      headers: {
        ...(isAuthRequired && authToken
          ? { Authorization: `Bearer ${authToken}` }
          : {}),
        ...(config.headers || {})
      }
    };
  }

  async get<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    try {
      const result = await this.client.get<T>(url, this.addAuthHeader(config));
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async put<T>(url: string, data?: any, config?: ApiRequestConfig): Promise<T> {
    try {
      const result = await this.client.put<T>(
        url,
        data,
        this.addAuthHeader(config)
      );
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    try {
      const result = await this.client.post<T>(
        url,
        data,
        this.addAuthHeader(config)
      );
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    try {
      const result = await this.client.patch<T>(
        url,
        data,
        this.addAuthHeader(config)
      );
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete<T>(url: string, config?: ApiRequestConfig): Promise<T> {
    try {
      const result = await this.client.delete<T>(
        url,
        this.addAuthHeader(config)
      );
      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
