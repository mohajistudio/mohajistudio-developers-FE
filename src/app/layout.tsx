'use client';

import { pretendard } from '@/styles/fonts';
import './globals.css';
import Providers from './providers';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 클라이언트 사이드 렌더링을 위한 상태 추가
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트된 후에만 렌더링
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <RecoilRoot>
          {!mounted ? children : <Providers>{children}</Providers>}
        </RecoilRoot>
      </body>
    </html>
  );
}
