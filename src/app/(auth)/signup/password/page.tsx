'use client';

import { ChevronLeft } from 'lucide-react';
import { PasswordInput } from '@/components/ui/Input/PasswordInput';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { getAuthErrorMessage } from '@/utils/handle-error';
import { ApiError } from '@/types/auth';
import { setPassword } from '@/apis/auth/register';

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPasswordValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 토큰 체크
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/signup');
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('인증 토큰이 없습니다.');

      await setPassword(password, accessToken);

      router.push('/signup/nickname');
    } catch (error) {
      if ('code' in (error as any)) {
        setError(getAuthErrorMessage(error as ApiError));
      } else {
        setError('비밀번호 설정에 실패했습니다. 잠시 후 다시 시도해주세요.');
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
          <h1 className="text-[30px] font-bold text-left">환영합니다!</h1>
          <p className="text-[16px] text-[#666666] text-left">
            비밀번호를 설정해주세요
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <div className="mb-5">
              <label className="block text-[16px] text-black mb-3">
                비밀번호
              </label>
              <div className={error ? 'ring-1 ring-[#FF3D5E] rounded-lg' : ''}>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  required
                  disabled={isLoading}
                />
              </div>
              {error && (
                <p className="text-[14px] text-[#FF3D5E] mt-2">
                  사용할수 없는 비밀번호입니다.
                </p>
              )}
            </div>

            <div className="mb-8">
              <label className="block text-[16px] text-black mb-3">
                비밀번호 확인
              </label>
              <div className={error ? 'ring-1 ring-[#FF3D5E] rounded-lg' : ''}>
                <PasswordInput
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                  disabled={isLoading}
                />
              </div>
              {error && (
                <p className="text-[14px] text-[#FF3D5E] mt-2">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>
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
