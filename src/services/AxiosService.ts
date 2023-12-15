import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `http://localhost:8080/api/`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config: any) => {
        const authToken = await this.getAuthToken();
        if (authToken) {
          config.headers.Authorization = authToken;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response: any) => response, 
      (error: AxiosError) => {
        console.error("API Error:", error);
        throw error;
      }
    );
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error("Error accessing AsyncStorage:", error);
      return null;
    }
  }

  public async get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, { params });
  }

  public async post<T>(
    url: string,
    data: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T>(
    url: string,
    data: any,
    config?: any
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }
}

export default new AxiosService();
