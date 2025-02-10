'use client';

import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/store/auth';

function AuthInitializer() {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    // 앱 시작 시 토큰 확인
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAuth({
        isLoggedIn: true,
        userInfo: {
          profileImage:
            'https://api.dicebear.com/7.x/avataaars/svg?seed=리자노',
          username: '사용자', // 실제 사용자 정보로 대체 필요
        },
      });
    }
  }, [setAuth]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <AuthInitializer />
      {children}
    </RecoilRoot>
  );
}
