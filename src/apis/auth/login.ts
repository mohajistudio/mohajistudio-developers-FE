import axios from 'axios';
import { instance } from '../instance';
import type { ApiError, LoginRequest, LoginResponse } from '@/types/auth';

// 이메일 상태 체크
export const checkLoginStatus = async (email: string) => {
  try {
    const response = await instance.get<void>('/auth/register/status', {
      params: { email },
    });

    // console.log('[이메일 체크 성공]', { email });
    return response.data;
  } catch (error) {
    // console.error('[이메일 체크 실패]', { error });
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiError;
    }
    throw error;
  }
};

// 로그인
export const login = async ({ email, password }: LoginRequest) => {
  try {
    // console.log('[로그인 요청 데이터]', {
    //   email,
    //   password,
    //   requestURL: '/auth/login',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    const response = await instance.post<LoginResponse>('/auth/login', {
      email,
      password,
    });

    // console.log('[로그인 성공]', response.data);
    return response.data;
  } catch (error) {
    // console.error('[로그인 실패]', {
    //   error,
    //   response: axios.isAxiosError(error) ? error.response?.data : null,
    //   status: axios.isAxiosError(error) ? error.response?.status : null,
    // });
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiError;
    }
    throw error;
  }
};
