import axios from 'axios';
import { instance } from '../instance';
import {
  type EmailVerificationRequest,
  type ApiError,
  EmailVerificationResponse,
  type SetNickNameRequest,
} from '@/types/auth';

//   이메일 인증 코드 발급
export const requestEmailVerification = async (email: string) => {
  try {
    const response = await instance.post<void>('/auth/register/email/request', {
      email,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiError;
    }
    throw error;
  }
};

//   이메일 인증 코드 확인
export const verifyEmailCode = async (email: string, code: string) => {
  try {
    // console.log('Request Data:', { email, code });
    const response = await instance.post<EmailVerificationResponse>(
      '/auth/register/email/verify',
      { email, code },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.log('Error Response:', error.response?.data);
      throw error.response.data as ApiError;
    }
    throw error;
  }
};

// 비밀번호 설정
export const setPassword = async (password: string, accessToken: string) => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('인증 토큰이 없습니다.');
  try {
    const response = await instance.post<void>(
      '/auth/register/password',
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data as ApiError;
    }
    throw error;
  }
};

// 닉네임 설정
export const setNickname = async (nickname: string) => {
  const token = localStorage.getItem('accessToken');
  if (!token) throw new Error('인증 토큰이 없습니다.');

  try {
    // console.log('[닉네임 설정 요청]', {
    //   nickname,
    //   token: `Bearer ${token}`,
    // });

    const response = await instance.post<void>(
      '/auth/register/nickname',
      { nickname },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // console.log('[닉네임 설정 성공]', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('[닉네임 설정 실패]', {
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response?.data) {
        throw error.response.data as ApiError;
      }
    }
    throw error;
  }
};
