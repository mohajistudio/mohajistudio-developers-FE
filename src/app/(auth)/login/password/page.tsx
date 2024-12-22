'use client';

import { ChevronLeft } from 'lucide-react';
import { PasswordInput } from '@/components/ui/Input/PasswordInput';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    if (password) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    }
  };

  return (
    <div className="relative w-full">
      {/* 백버튼을 absolute로 좌측 상단에 배치 */}
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
          <h1 className="text-[30px] font-bold text-left">Mohaji Developers</h1>
          <p className="text-[16px] text-[#666666] text-left">
            비밀번호를 입력하세요
          </p>
        </div>

        {/* 폼 영역 */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-[16px] text-black mb-3">
              password
            </label>
            <PasswordInput
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-[48px] bg-[#0A0A0A] text-white rounded-lg hover:opacity-90 mb-[60px]"
          >
            로그인
          </button>

          {/* 회원가입 링크 */}
          <div className="text-center text-[16px]">
            <span className="text-[#666666]">비밀번호를 잊으셨나요? </span>
            <Link href="/password/reset" className="text-[#1E96FF]">
              비밀번호 찾기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
