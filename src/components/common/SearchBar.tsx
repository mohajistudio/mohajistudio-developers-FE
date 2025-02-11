'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // 디바운스 적용된 검색 함수
  const debouncedSearch = useDebounce((value: string) => {
    onSearch(value);
  }, 300);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  return (
    <section className="w-[71%] max-md:w-full">
      {/* Search 타이틀 */}
      <div className="flex items-center gap-2 mb-3">
        <Image src="/icon/Search.svg" alt="검색" width={24} height={24} />
        <h2 className="text-base font-bold">Search</h2>
      </div>

      {/* 검색 입력창 */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="검색어를 입력해주세요."
          className="w-full h-12 px-4 bg-[#E4E6EB] rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] placeholder:text-[#666666] text-base"
        />
      </div>
    </section>
  );
}
