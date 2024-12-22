'use client';

import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 회원가입 이메일 검증 로직 구현
    if (email) {
      localStorage.setItem('tempEmail', email);
      router.push(`/verify/email/sent?email=${encodeURIComponent(email)}`);
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

          <button
            type="submit"
            className="w-full h-[48px] bg-[#0A0A0A] text-white rounded-lg hover:opacity-90 mb-[60px]"
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
}
