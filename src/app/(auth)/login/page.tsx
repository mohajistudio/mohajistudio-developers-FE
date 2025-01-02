'use client';

import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { getAuthErrorMessage } from '@/utils/handle-error';
import { checkLoginStatus, login } from '@/apis/auth/login';
import type { ApiError } from '@/types/auth';
import { ChevronLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 이메일 상태 체크
      await checkLoginStatus(email);

      // 이메일 임시 저장
      localStorage.setItem('tempEmail', email);

      // 비밀번호 입력 페이지 이동
      router.push('/login/password');
    } catch (error) {
      if ('code' in (error as any)) {
        setError(getAuthErrorMessage(error as ApiError));
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
            이메일로 로그인
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[16px] text-black mb-3">email</label>
            <Input
              type="email"
              placeholder="Mohaji@naver.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className={error ? 'border-[#FF3D5E]' : ''}
            />
          </div>

          {error && <p className="text-[14px] text-[#FF3D5E] pt-1">{error}</p>}

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
            onClick={() => router.push('/signup')}
            className="text-[#1E96FF] text-[14px] hover:underline"
          >
            아직 회원이 아니신가요? 회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
