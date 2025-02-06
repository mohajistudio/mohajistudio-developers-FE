'use client';

import React, { useEffect, useState } from 'react';
import { TableOfContents as TOCIcon } from 'lucide-react';
import { TocItem } from '@/types/blog';

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Intersection Observer 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' },
    );

    // 모든 헤딩 요소들을 관찰
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 부드러운 스크롤 효과로 해당 섹션으로 이동
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveId(id);
    }
  };

  return (
    <nav className="sticky top-48">
      <div className="flex items-center gap-2 mb-4">
        <TOCIcon className="w-6 h-6" />
        <div className="font-bold text-black">Chapter</div>
      </div>

      <div className="flex gap-2">
        <div className="w-0.5 bg-gray-200" />
        <ul className="flex-1 text-sm text-gray3">
          {items.map((item) => (
            <li
              key={item.id}
              className={`
                my-2 cursor-pointer transition-colors hover:text-black
                ${activeId === item.id ? 'text-black' : ''}
                ${item.level === 2 ? 'ml-4' : ''}
                ${item.level === 3 ? 'ml-8' : ''}
              `}
              onClick={() => handleClick(item.id)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
