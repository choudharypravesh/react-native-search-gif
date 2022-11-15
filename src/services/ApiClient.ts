import apisauce from 'apisauce';
// @ts-ignore
import {GIF_API_BASE_URL, API_KEY} from '@env';
import {AxiosRequestConfig} from 'axios';
import {CustomError, getError} from './APIErrorHandler';

type APIResponse = any | CustomError;

type Headers = {
  'Cache-Control': string;
  'content-type': string;
  Accept: string;
};

export const getInstance = async () => {
  let headers: Headers = {
    'Cache-Control': 'no-cache',
    'content-type': 'application/json',
    Accept: 'application/json',
  };

  return apisauce.create({
    baseURL: GIF_API_BASE_URL,
    headers,
    timeout: 16000, // timeout of 8 seconds timesout the API client over VPN.
  });
};

const APIClient = {
  get: async (
    url: string,
    params?: {},
    axiosConfig?: AxiosRequestConfig,
  ): Promise<APIResponse> => {
    const api = await getInstance();
    const paramsWithKey = {
      ...params,
      api_key: API_KEY,
    };
    const response = await api.get(url, paramsWithKey, axiosConfig);
    if (!response.ok) {
      throw getError(response);
    }
    return response.data;
  },
  post: async (
    url: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig,
  ): Promise<APIResponse> => {
    const api = await getInstance();
    const response = await api.post(url, data, axiosConfig);
    if (!response.ok) {
      throw getError(response);
    }
    return response.data;
  },
  put: async (
    url: string,
    data?: any,
    axiosConfig?: AxiosRequestConfig,
  ): Promise<APIResponse> => {
    const api = await getInstance();
    const response = await api.put(url, data, axiosConfig);
    if (!response.ok) {
      throw getError(response);
    }
    return response.data;
  },
  delete: async (
    url: string,
    params?: {},
    body?: {},
    axiosConfig?: AxiosRequestConfig,
  ): Promise<APIResponse> => {
    const api = await getInstance();
    const response = await api.delete(url, params, {...body, ...axiosConfig});
    if (!response.ok) {
      throw getError(response);
    }
    return response.data;
  },
};

export default APIClient;
