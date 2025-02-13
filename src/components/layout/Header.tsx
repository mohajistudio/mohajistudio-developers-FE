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
        {/* 왼쪽 영역 (PostCard와 동일한 width) */}
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

        {/* 오른쪽 영역 (Developers 섹션과 동일한 width) */}
        <div className="w-[29%] flex justify-end">
          <div className="flex items-center gap-4">
            {/* 글쓰기 버튼은 로그인 상태일 때만 표시하고 /write로 이동 */}
            {auth.isLoggedIn && (
              <Link
                href="/write"
                className="p-2 rounded-full hover:bg-[#000000] hover:bg-opacity-40 transition-all"
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
                  className="w-8 h-8 rounded-full overflow-hidden group transition-all"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-full h-full">
                    {auth.userInfo?.profileImage ? (
                      <img
                        src={auth.userInfo.profileImage}
                        alt="프로필"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-100 group-hover:bg-[#000000] group-hover:bg-opacity-40">
                        <Image
                          src="/icon/User.svg"
                          alt="프로필"
                          width={24}
                          height={24}
                        />
                      </div>
                    )}
                  </div>
                </button>
                {isDropdownOpen && <ProfileDropdown onLogout={handleLogout} />}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 rounded-full hover:bg-black/40 transition-all"
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
