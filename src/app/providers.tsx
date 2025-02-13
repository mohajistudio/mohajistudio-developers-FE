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
          profileImage: '',
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
