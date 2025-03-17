'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '@/store/auth';
import ProfileDropdown from './ProfileDropdown';
import Image from 'next/image';
import ProfileImage from '@/components/common/ProfileImage';

export default function Header() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  const handleLogout = () => {
    // localStorage 완전 초기화
    localStorage.clear(); // 모든 데이터 삭제

    // Recoil 상태 초기화
    setAuth({
      isLoggedIn: false,
      userInfo: null,
    });

    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F2F3F5]">
      <div className="max-w-[1240px] mx-auto h-16 flex items-center justify-between">
        {/* 왼쪽 영역 */}
        <div className="w-[71%]">
          <Link href="/" className="text-2xl font-bold text-[#0A0A0A]">
            <Image
              src="/icon/logo.svg"
              alt="Mohaji Developers Logo"
              width={123}
              height={28}
              priority
            />
          </Link>
        </div>

        {/* 오른쪽 영역 */}
        <div className="w-[29%] flex justify-end">
          <div className="flex items-center gap-4">
            {auth.isLoggedIn && (
              <Link
                href="/write"
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black hover:bg-opacity-40 transition-all"
              >
                <Image
                  src="/icon/Edit.svg"
                  alt="글쓰기"
                  width={24}
                  height={24}
                />
              </Link>
            )}

            {auth.isLoggedIn ? (
              <div className="relative">
                <button
                  className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden hover:bg-black hover:bg-opacity-40 transition-all"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <ProfileImage src={auth.userInfo?.profileImage} size={24} />
                </button>
                {isDropdownOpen && <ProfileDropdown onLogout={handleLogout} />}
              </div>
            ) : (
              <Link
                href="/login"
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black hover:bg-opacity-40 transition-all"
              >
                <Image
                  src="/icon/Login.svg"
                  alt="로그인"
                  width={24}
                  height={24}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
