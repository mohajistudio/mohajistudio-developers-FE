'use client';

import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    if (email) {
      localStorage.setItem('loginEmail', 'email');
      router.push(`/login/password?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="w-full max-w-[360px] mx-auto">
      {/* 헤더 영역 */}
      <div className="space-y-[20px] mb-[60px]">
        <h1 className="text-[30px] font-bold text-left">Mohaji Developers</h1>
        <p className="text-[16px] text-[#666666] text-left">이메일로 로그인</p>
      </div>

      {/* 폼 영역 */}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-[16px] text-black mb-3">email</label>
          <Input
            type="email"
            placeholder="Mohaji@naver.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button className="w-full h-[48px] mb-[60px]" type="submit">
          로그인
        </Button>

        {/* 회원가입 링크 */}
        <div className="text-center text-[16px]">
          <span className="text-[#666666]">아직 회원이 아니신가요? </span>
          <Link href="/signup" className="text-[#1E96FF]">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
