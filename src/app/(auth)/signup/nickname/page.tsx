'use client';

import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { DisabledInput } from '@/components/ui/Input/DisabledInput';
import { getAuthErrorMessage } from '@/utils/handle-error';
import type { ApiError } from '@/types/auth';
import { AUTH_ERROR_CODES } from '@/types/auth';
import { setNickname } from '@/apis/auth/register';

export default function SetNickNamePage() {
  const router = useRouter();
  const [nickname, setNicknameValue] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  // 초기 로딩 시 토큰과 이메일 체크
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedEmail = localStorage.getItem('tempEmail');

    if (!accessToken) {
      router.push('/signup');
      return;
    }

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // accessToken 확인
    const token = localStorage.getItem('accessToken');
    console.log('[닉네임 설정 시작]', {
      nickname,
      hasToken: !!token,
    });

    try {
      await setNickname(nickname);
      // console.log('[닉네임 설정 완료]');

      // 회원가입 완료 후 필요없는 임시 데이터 삭제
      localStorage.removeItem('tempEmail');

      // 홈 페이지로 이동
      router.push('/login');
    } catch (error) {
      // console.error('[닉네임 설정 에러]', error);

      if ('code' in (error as any)) {
        const apiError = error as ApiError;
        // console.error('[API 에러]', {
        //   code: apiError.code,
        //   message: apiError.message,
        // });
        setError(getAuthErrorMessage(apiError));
      } else {
        setError('닉네임 설정에 실패했습니다. 잠시 후 다시 시도해주세요.');
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
            닉네임을 설정해주세요
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-[16px] text-[#666666] mb-3">
              email
            </label>
            <DisabledInput value={email} />
          </div>

          <div className="mb-8">
            <label className="block text-[16px] text-black mb-3">
              프로필 이름
            </label>
            <div className={error ? 'ring-1 ring-[#FF3D5E] rounded-lg' : ''}>
              <Input
                type="text"
                placeholder="Mohaji_Developer"
                value={nickname}
                onChange={(e) => {
                  setNicknameValue(e.target.value);
                }}
                required
                disabled={isLoading}
              />
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
