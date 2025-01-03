'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EmailSentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || localStorage.getItem('tempEmail');

  const handleConfirm = () => {
    router.push(`/verify/email?email=${encodeURIComponent(email || '')}`);
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

      <div className="w-full max-w-[360px] mx-auto text-center">
        <div className="space-y-[20px] mb-[60px]">
          <h1 className="text-[30px] font-bold">메일 인증</h1>
          <div className="space-y-2">
            <div className="space-y-1 text-[16px] text-[#666666]">
              <p>
                <span className="font-bold">{email}</span>으로
              </p>
              <p>인증 메일이 발송되었습니다.</p>
            </div>
            <p className="text-[16px] text-[#666666]">
              링크로 접속하여 인증을 완료해주세요
            </p>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-2/5 h-[48px] bg-[#0A0A0A] text-white rounded-lg hover:opacity-90"
        >
          확인
        </button>
      </div>
    </div>
  );
}
