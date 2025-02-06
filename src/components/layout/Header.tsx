'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { MdLogin } from 'react-icons/md';

// 임시 사용자 데이터
const userInfo = {
  profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=리자노',
  username: '리자노',
};

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F2F3F5]">
      <div className="max-w-[1240px] mx-auto h-16 flex items-center justify-between">
        {/* 왼쪽 영역 (PostCard와 동일한 width) */}
        <div className="w-[71%]">
          <Link href="/" className="text-2xl font-bold text-[#0A0A0A]">
            Mohaji Developers
          </Link>
        </div>

        {/* 오른쪽 영역 (Developers 섹션과 동일한 width) */}
        <div className="w-[29%] flex justify-end">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <SquarePen className="w-5 h-5 text-gray-600" />
            </button>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src={userInfo.profileImage}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                </button>
                {isDropdownOpen && (
                  <ProfileDropdown onLogout={() => setIsLoggedIn(false)} />
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MdLogin className="w-5 h-5 text-gray-600" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
