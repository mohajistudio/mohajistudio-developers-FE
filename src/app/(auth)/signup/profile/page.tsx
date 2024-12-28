'use client';

import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { DisabledInput } from '@/components/ui/Input/DisabledInput';
import { getAuthErrorMessage } from '@/utils/handle-error';
import type { ApiError } from '@/types/auth';

export default function SetProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TODO: 백엔드 연결 시 useEffect로 수정예정
  // 컴포넌트 마운트 시 이메일과 토큰 체크
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const savedEmail = localStorage.getItem('tempEmail');

    if (!accessToken) {
      router.push('/signup');
      return;
    }

    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        router.push('/signup');
        return;
      }

      await setNickname(nickname);
      // 회원가입 완료 후 로그인 페이지로 이동
      router.push('/login');
    } catch (error) {
      if ('code' in (error as any)) {
        setError(getAuthErrorMessage(error as ApiError));
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
          <div className="space-y-5">
            <div>
              <label className="block text-[16px] text-[#666666] mb-3">
                email
              </label>
              <DisabledInput value={email} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[16px] text-black">프로필 이름</label>
                {error && <p className="text-[14px] text-[#FF3D5E]">{error}</p>}
              </div>
              <Input
                type="text"
                placeholder="Mohaji_Developer"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                disabled={isLoading}
                className={error ? 'border-[#FF3D5E]' : ''}
              />
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
