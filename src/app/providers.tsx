'use client';

import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '@/store/auth';
import { jwtDecode } from 'jwt-decode';
import type { CustomJwtPayload } from '@/types/auth';

function AuthInitializer() {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    // 앱 시작 시 토큰 확인
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const decoded = jwtDecode<CustomJwtPayload>(accessToken);
        console.log('Decoded token:', decoded);

        // user 객체에서 정보 추출
        const userInfo = {
          id: decoded.user.sub,
          email: decoded.user.email,
          role: decoded.user.role,
          nickname: decoded.user.nickname,
          profileImage:
            localStorage.getItem('profileImage') ||
            '/icon/Profile_Default_img@2x.svg',
        };

        console.log('Setting auth state with:', userInfo);

        setAuth({
          isLoggedIn: true,
          userInfo,
        });
      } catch (error) {
        console.error('Token decode error:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAuth({
          isLoggedIn: false,
          userInfo: null,
        });
      }
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
