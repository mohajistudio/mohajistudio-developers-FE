import { atom } from 'recoil';
import { jwtDecode } from 'jwt-decode';
import type { CustomJwtPayload } from '@/types/auth';

// 사용자 정보 타입 정의
interface UserInfo {
  id: string;
  email: string;
  nickname: string;
  role: string;
  profileImage: string;
}

// 인증 상태 타입
interface AuthState {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
}

// 로그인 상태를 위한 atom
export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    userInfo: null,
  },
});

// auth 상태 설정 함수
export const initializeAuthState = (setAuth: any, accessToken: string) => {
  try {
    const decoded = jwtDecode<CustomJwtPayload>(accessToken);

    const userInfo = {
      id: decoded.user.sub,
      email: decoded.user.email,
      role: decoded.user.role,
      nickname: decoded.user.nickname,
      profileImage:
        localStorage.getItem('profileImage') ||
        '/icon/Profile_Default_img@2x.svg',
    };

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
};
