import Link from 'next/link';

interface ProfileDropdownProps {
  onLogout: () => void;
}

export default function ProfileDropdown({ onLogout }: ProfileDropdownProps) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="py-2">
        <Link
          href="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          내 블로그
        </Link>
        <Link
          href="/profile/settings"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          임시글
        </Link>
        <Link
          href="/profile/settings"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          설정
        </Link>
        <button
          onClick={onLogout}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
