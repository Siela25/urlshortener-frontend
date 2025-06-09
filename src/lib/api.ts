import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { API_CONFIG, ERROR_MESSAGES, STORAGE_KEYS } from './constants';
import type { ApiResponse, ApiError, RequestOptions } from '@/types/api';

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      //withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(token => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return this.client(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newToken = await this.refreshToken();
            this.processQueue(null, newToken);
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.client(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            this.logout();
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  private setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  private setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  private removeTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  private async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.client.post('/api/auth/refresh', {
      refresh_token: refreshToken,
    });

    const { access_token } = response.data;
    this.setToken(access_token);
    return access_token;
  }

  private logout(): void {
    this.removeTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const data = error.response.data as any;
      return {
        error: data?.error || data?.message || ERROR_MESSAGES.SERVER_ERROR,
        status: error.response.status,
        timestamp: new Date().toISOString(),
      };
    }

    if (error.request) {
      // Request made but no response
      return {
        error: ERROR_MESSAGES.NETWORK_ERROR,
        status: 0,
        timestamp: new Date().toISOString(),
      };
    }

    // Something else happened
    return {
      error: error.message || ERROR_MESSAGES.SERVER_ERROR,
      status: 0,
      timestamp: new Date().toISOString(),
    };
  }

  // Public API methods
  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.client.get(url, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  }

  async post<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    const response = await this.client.post(url, data, {
      headers: options?.headers,
    });
    return response.data;
  }

  async put<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    const response = await this.client.put(url, data, {
      headers: options?.headers,
    });
    return response.data;
  }

  async patch<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    const response = await this.client.patch(url, data, {
      headers: options?.headers,
    });
    return response.data;
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.client.delete(url, {
      headers: options?.headers,
    });
    return response.data;
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.post('/api/auth/login', { email, password });
    
    if (response.access_token) {
      this.setToken(response.access_token);
    }
    if (response.refresh_token) {
      this.setRefreshToken(response.refresh_token);
    }
    
    return response;
  }

  async register(email: string, password: string) {
    const response = await this.post('/api/auth/register', { email, password });
    
    if (response.access_token) {
      this.setToken(response.access_token);
    }
    if (response.refresh_token) {
      this.setRefreshToken(response.refresh_token);
    }
    
    return response;
  }

  async logoutUser() {
    try {
      await this.delete('/api/auth/logout');
    } catch (error) {
      // Ignore errors during logout
    } finally {
      this.removeTokens();
    }
  }

  // Utility methods
  setAuthToken(token: string) {
    this.setToken(token);
  }

  setAuthRefreshToken(token: string) {
    this.setRefreshToken(token);
  }

  clearAuth() {
    this.removeTokens();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Health check
  async healthCheck() {
    return this.get('/health');
  }

  // File upload helper
  async uploadFile(url: string, file: File, onProgress?: (progress: number) => void) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          onProgress(progress);
        }
      },
    });

    return response.data;
  }

  // Download helper
  async downloadFile(url: string, filename?: string) {
    const response = await this.client.get(url, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  }
}

// Create singleton instance
const apiClient = new ApiClient();

export default apiClient;

// Export specific methods for convenience
export const {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
  login,
  register,
  logoutUser: logout,
  healthCheck,
  uploadFile,
  downloadFile,
} = apiClient;