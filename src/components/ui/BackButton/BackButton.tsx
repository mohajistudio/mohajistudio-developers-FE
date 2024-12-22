'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute left-4 top-4 text-gray-2 hover:text-gray-1"
      aria-label="뒤로 가기"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  );
}
