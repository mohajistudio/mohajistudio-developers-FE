'use client';

import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function EmailVerificationPage() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 인증 코드 검증 로직 구현
    // 테스트용
    if (verificationCode === '123456') {
      localStorage.setItem('isVerified', 'true');
      router.push('/signup/password');
    } else {
      setError('인증코드가 일치하지 않습니다.');
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
          <div className="relative">
            {' '}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={handleChange}
                maxLength={6}
                required
                className={`w-[206px] h-[39px] ${error ? 'border-[#FF3D5E]' : ''}`}
              />
              <button
                type="button"
                onClick={handleResend}
                className="w-[82px] h-[39px] bg-[#1E96FF] text-white rounded-lg hover:opacity-90 text-[14px]"
              >
                재전송
              </button>
            </div>
            {/* 에러 메시지 */}
            {error && (
              <p className="absolute top-[45px] left-0 text-[14px] text-[#FF3D5E]">
                {error}
              </p>
            )}
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
