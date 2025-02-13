'use client';

import { ChevronLeft } from 'lucide-react';
import { PasswordInput } from '@/components/ui/Input/PasswordInput';
import { DisabledInput } from '@/components/ui/Input/DisabledInput';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { login } from '@/apis/auth/login';
import { getAuthErrorMessage } from '@/utils/handle-error';
import type { ApiError } from '@/types/auth';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authState } from '@/store/auth';

export default function LoginPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const storedEmail = localStorage.getItem('tempEmail');
    if (!storedEmail) {
      router.push('/login');
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login({ email, password });

      // 토큰 저장 시 Bearer 접두사 없이 저장
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      // 저장된 토큰 확인
      console.log('Stored tokens:', {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      });

      // Recoil 상태 업데이트
      setAuth({
        isLoggedIn: true,
        userInfo: {
          profileImage: '', // 외부 이미지 URL 대신 빈 문자열로 설정
        },
      });

      // 임시 데이터 삭제
      localStorage.removeItem('tempEmail');

      // 홈으로 이동
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);

      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiError;
        setError(getAuthErrorMessage(apiError));
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => router.back()}
        className="absolute -top-12 -left-12"
        aria-label="뒤로 가기"
      >
        <ChevronLeft className="h-6 w-6 text-[#666666] hover:text-[#4D4D4D]" />
      </button>

      <div className="w-full max-w-[360px] mx-auto">
        <div className="space-y-[20px] mb-[60px]">
          <h1 className="text-[30px] font-bold text-left">Mohaji Developers</h1>
          <p className="text-[16px] text-[#666666] text-left">
            비밀번호로 입력
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[16px] text-[#666666] mb-3">
              email
            </label>
            <DisabledInput value={email} />
          </div>

          <div>
            <label className="block text-[16px] text-black mb-3">
              password
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className={error ? 'border-[#FF3D5E]' : ''}
              autoComplete="new-password"
            />
          </div>

          {error && <p className="text-[14px] text-[#FF3D5E] pt-2">{error}</p>}

          <button
            type="submit"
            className={`w-full h-[48px] bg-[#0A0A0A] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${
              error ? 'mt-3' : 'mt-5'
            }`}
            disabled={isLoading}
          >
            {isLoading ? '처리중...' : '로그인'}
          </button>
        </form>

        <div className="mt-5 text-center">
          <button
            onClick={() => {
              // TODO: 비밀번호 찾기 페이지로 이동
              alert('준비 중인 기능입니다.');
            }}
            className="text-[#1E96FF] text-[14px] hover:underline"
          >
            비밀번호를 잃으셨나요?
          </button>
        </div>
      </div>
    </div>
  );
}
