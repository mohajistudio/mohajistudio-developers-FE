import { atom } from 'recoil';

// 사용자 정보 타입 정의
interface UserInfo {
  profileImage: string;
  username: string;
}

// 로그인 상태를 위한 atom
export const authState = atom<{
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
}>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    userInfo: null,
  },
});
