'use client';

import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { verifyEmailCode } from '@/apis/auth/register';
import { getAuthErrorMessage } from '@/utils/handle-error';
import { ApiError } from '@/types/auth';

export default function EmailVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const email = searchParams.get('email') || '';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await verifyEmailCode(email, verificationCode);

      // 토큰 저장
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      // 비밀번호 설정 페이지로 이동
      router.push('/signup/password');
    } catch (error) {
      if ('code' in (error as any)) {
        setError(getAuthErrorMessage(error as ApiError));
      } else {
        setError('인증에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    // 재전송 버튼 클릭 시 메시지만 표시(테스트)
    setVerificationCode('');
    setError('');
    alert('인증 코드가 재전송 되었습니다.');
  };

  // 입력값 변경 시 에러 메시지 초기화
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
    setError('');
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
          <h1 className="text-[30px] font-bold text-left">이메일 인증</h1>
          <p className="text-[16px] text-[#666666] text-left">
            이메일 인증코드가 발송되었습니다.
            <br />
            인증 코드를 입력하세요
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-3">
              <label className="text-[16px] text-black">인증코드</label>
              {error && <p className="text-[14px] text-[#FF3D5E]">{error}</p>}
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                required
                className={`w-[206px] h-[39px] ${error ? 'border-[#FF3D5E]' : ''}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={handleResend}
                className="w-[82px] h-[39px] bg-[#1E96FF] text-white rounded-lg hover:opacity-90 text-[14px]"
                disabled={isLoading}
              >
                재전송
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-[48px] bg-[#0A0A0A] text-white rounded-lg hover:opacity-90 mt-[60px] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? '처리중...' : '확인'}
          </button>
        </form>
      </div>
    </div>
  );
}
