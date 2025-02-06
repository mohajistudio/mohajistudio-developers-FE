import axios, { AxiosError } from 'axios';
import { ApiError } from '@/types/auth';

// JWT 디코드 함수
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
};

// 토큰의 role 확인 함수
const checkUserRole = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  const decoded = decodeJWT(token);
  console.log('Decoded token:', decoded); // role 확인용 로그
  return decoded?.role;
};

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const multipartInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

// 토큰 재발급 진행 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 재발급 대기중인 요청들을 저장하는 배열
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰 재발급 완료 후 대기중인 요청들을 처리
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 토큰 재발급 실패 시 대기중인 요청들을 에러 처리
const onRefreshError = (error: any) => {
  refreshSubscribers = [];
  // 토큰 재발급 실패 시 로그인 페이지로 리다이렉트
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

// 토큰 재발급 함수
const refreshTokens = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    console.log('Current user role:', checkUserRole()); // role 확인용 로그

    const response = await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { refreshToken },
      withCredentials: true,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // 새 토큰의 role 확인
    const newTokenRole = decodeJWT(accessToken)?.role;
    console.log('New token role:', newTokenRole);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error('Token refresh error details:', {
      error,
      response: axios.isAxiosError(error) ? error.response?.data : null,
      currentRole: checkUserRole(),
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw error;
  }
};

// 요청 인터셉터
const requestInterceptor = (config: any) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const role = checkUserRole();
    console.log('Current user role for request:', role);

    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

instance.interceptors.request.use(requestInterceptor);
multipartInstance.interceptors.request.use(requestInterceptor);

// 응답 인터셉터
const responseInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config;

  if (!originalRequest) {
    return Promise.reject(error);
  }

  // 401 에러이고 토큰 재발급 시도를 하지 않은 경우에만 재시도
  if (error.response?.status === 401 && !(originalRequest as any)._retry) {
    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshSubscribers.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalRequest));
        });
      });
    }

    isRefreshing = true;
    (originalRequest as any)._retry = true;

    try {
      const newToken = await refreshTokens();

      // 새 토큰으로 헤더 업데이트
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      // 대기 중인 요청들 처리
      refreshSubscribers.forEach((callback) => callback(newToken));
      refreshSubscribers = [];

      // 원래 요청 재시도
      return axios(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  // 다른 에러인 경우
  if (error.response?.data) {
    return Promise.reject(error.response.data as ApiError);
  }
  return Promise.reject(error);
};

instance.interceptors.response.use((response) => response, responseInterceptor);

multipartInstance.interceptors.response.use(
  (response) => response,
  responseInterceptor,
);
