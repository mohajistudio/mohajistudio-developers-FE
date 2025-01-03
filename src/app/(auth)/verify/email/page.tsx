'use client';

import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import {
  requestEmailVerification,
  verifyEmailCode,
} from '@/apis/auth/register';
import { getAuthErrorMessage } from '@/utils/handle-error';
import { ApiError } from '@/types/auth';

export default function EmailVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5분 = 300초
  const email = searchParams.get('email') || '';

  // 타이머 구현
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 남은 시간을 MM:SS 형식으로 변환
  const formatTime = (seconds: number) => {
    if (seconds <= 0) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await verifyEmailCode(email, verificationCode);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('tempEmail', email);
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

  const handleResend = async () => {
    try {
      setIsLoading(true);
      setVerificationCode('');
      setError('');

      // 이메일 인증 코드 재발급 API 호출
      await requestEmailVerification(email);

      // 타이머 리셋
      setTimeLeft(300);

      alert('인증 코드가 재전송 되었습니다.');
    } catch (error) {
      if ('code' in (error as any)) {
        setError(getAuthErrorMessage(error as ApiError));
      } else {
        setError('인증 코드 재전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
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
          <h1 className="text-[30px] font-bold text-center">이메일 인증</h1>
          <p className="text-[16px] text-[#666666] text-center">
            이메일 인증코드가 발송되었습니다.
            <br />
            인증 코드를 입력하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[16px] text-black mb-3">
              인증코드
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  required
                  className={error ? 'border-[#FF3D5E]' : ''}
                  disabled={isLoading}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px] text-[#666666]">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleResend}
                className="w-[82px] h-[39px] bg-[#1E96FF] text-white rounded-lg hover:opacity-90 text-[14px]"
                disabled={isLoading}
              >
                재전송
              </button>
            </div>
            {error && (
              <p className="text-[14px] text-[#FF3D5E] mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-[48px] bg-[#0A0A0A] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? '처리중...' : '확인'}
          </button>
        </form>
      </div>
    </div>
  );
}
