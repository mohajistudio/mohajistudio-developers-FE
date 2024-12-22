'use client';

import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { DisabledInput } from '@/components/ui/Input/DisabledInput';

export default function SetProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState(''); // localStorage에서 가져올 이메일
  const [nickname, setNickname] = useState('');

  // TODO: 백엔드 연결 시 useEffect로 수정예정
  // 컴포넌트 마운트 시 이메일 가져오기
  useState(() => {
    const savedEmail = localStorage.getItem('tempEmail');
    if (savedEmail) setEmail(savedEmail);
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nickname) {
      // 회원가입 정보 저장
      localStorage.setItem('userNickname', nickname);
      router.push('/login');
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

      {/* 헤더 영역 */}
      <div className="w-full max-w-[360px] mx-auto">
        <div className="space-y-[20px] mb-[60px]">
          <h1 className="text-[30px] font-bold text-left">환영합니다!</h1>
          <p className="text-[16px] text-[#666666] text-left">
            닉네임을 설정해주세요
          </p>
        </div>

        {/* 폼 영역 */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label className="block text-[16px] text-[#666666] mb-3">
                email
              </label>
              <DisabledInput value={email} />
            </div>

            <div>
              <label className="block text-[16px] text-black mb-3">
                프로필 이름
              </label>
              <Input
                type="text"
                placeholder="Mohaji_Developer"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-[48px] bg-[#0A0A0A] text-white rounded-lg hover:opacity-90 mt-[60px]"
          >
            확인
          </button>
        </form>
      </div>
    </div>
  );
}
