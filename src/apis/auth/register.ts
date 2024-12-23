import axios from 'axios';
import { instance } from '../instance';
import {
  type EmailVerificationRequest,
  type ApiError,
  EmailVerificationResponse,
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
