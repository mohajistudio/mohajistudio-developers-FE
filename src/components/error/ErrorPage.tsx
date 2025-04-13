'use client';

import Image from 'next/image';

interface ErrorPageProps {
  code: '401' | '404' | '500' | '204';
  title: string;
  message: string;
  showHomeButton?: boolean;
}

const ErrorPage = ({
  code,
  title,
  message,
  showHomeButton = true,
}: ErrorPageProps) => {
  const errorIcons = {
    '401': '/icon/error/401_Unauthorizaed.svg',
    '404': '/icon/error/404_Page not found.svg',
    '500': '/icon/error/500_Server error.svg',
    '204': '/icon/error/204_empty.svg',
  };

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
          src={errorIcons[code]}
          alt={`${code} error`}
          width={160}
          height={160}
          className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2"
          priority
        />
      </div>

      <div className="mt-12 text-center">
        <h1 className="text-[40px] font-semibold text-black leading-[44px] font-pretendard">
          {code}
        </h1>
        <h2 className="text-[14px] font-bold text-black mt-4 leading-[24px] font-pretendard">
          {title}
        </h2>
        <p className="text-[13px] text-gray-2 leading-[20px] font-pretendard font-medium">
          {message}
        </p>

        {code !== '204' && (
          <button
            onClick={() => {
              if (code === '500') {
                window.location.reload();
              } else {
                window.location.href = '/';
              }
            }}
            className="mt-8 inline-flex justify-center items-center w-[91px] h-[32px] bg-primary rounded-[16px] hover:bg-opacity-90 transition-colors"
          >
            <span className="text-[14px] font-medium leading-[16px] text-white font-pretendard overflow-hidden text-ellipsis">
              {code === '500' ? '재시도' : '홈으로'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
