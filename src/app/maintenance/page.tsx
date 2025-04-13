'use client';

import Image from 'next/image';

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative w-[320px]">
        <Image
          src="/icon/error/Half_circle.svg"
          alt="반원 배경"
          width={320}
          height={160}
          className="opacity-50"
          priority
        />
        <Image
          src="/icon/error/Server_maintenance.svg"
          alt="서버 점검"
          width={160}
          height={160}
          className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2"
          priority
        />
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-[14px] font-bold text-black mt-4 leading-[24px] font-pretendard">
          Server is down
        </h2>
        <p className="text-[13px] text-gray-2 leading-[20px] font-pretendard font-medium">
          서버가 점검중입니다
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 inline-flex justify-center items-center w-[91px] h-[32px] bg-primary rounded-[16px] hover:bg-opacity-90 transition-colors"
        >
          <span className="text-[14px] font-medium leading-[16px] text-white font-pretendard overflow-hidden text-ellipsis">
            재시도
          </span>
        </button>
      </div>
    </div>
  );
}
