'use client';

import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { requestEmailVerification } from '@/apis/auth/register';
import { getAuthErrorMessage } from '@/utils/handle-error';
import type { ApiError } from '@/types/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await requestEmailVerification(email);

      localStorage.setItem('tempEmail', email);
      router.push(
        `/verify/email?email=${encodeURIComponent(email)}&expiredAt=${encodeURIComponent(response.expiredAt)}`,
      );
    } catch (error) {
      if ('code' in (error as any)) {
        setError(getAuthErrorMessage(error as ApiError));
      } else {
        setError('인증 메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* 백버튼 */}
      <button
        onClick={() => router.back()}
        className="absolute -top-12 -left-12"
        aria-label="뒤로 가기"
      >
        <ChevronLeft className="h-6 w-6 text-[#666666] hover:text-[#4D4D4D]" />
      </button>

      <div className="w-full max-w-[360px] mx-auto">
        {/* 헤더 영역 */}
        <div className="space-y-[20px] mb-[60px]">
          <h1 className="text-[30px] font-bold text-left">회원가입</h1>
          <p className="text-[16px] text-[#666666] text-left">
            계정 생성을 위해 이메일을 입력해주세요
          </p>
        </div>

        {/* 폼 영역 */}
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

          {error && <p className="text-[14px] text-[#FF3D5E] pt-2">{error}</p>}

          <button
            type="submit"
            className={`w-full h-[48px] bg-[#0A0A0A] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${
              error ? 'mt-3' : 'mt-5'
            }`}
            disabled={isLoading}
          >
            {isLoading ? '처리중...' : '다음'}
          </button>
        </form>
      </div>
    </div>
  );
}
