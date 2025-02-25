'use client';

import React, { useEffect, useState } from 'react';
import { TableOfContents as TOCIcon } from 'lucide-react';
import { TocItem } from '@/types/blog';

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  // 현재 활성화된 목차 항목 ID 상태
  const [activeId, setActiveId] = useState<string>('');

  // 스크롤 위치에 따라 활성 헤딩 업데이트
  useEffect(() => {
    // 스크롤 이벤트가 너무 많이 발생하는 것을 방지하는 디바운스 함수
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        // 스크롤 위치에 따른 활성 헤딩 감지
        updateActiveHeading();
      }, 100); // 100ms 디바운스
    };

    // 화면에 보이는 헤딩을 찾아서 활성화하는 함수
    const updateActiveHeading = () => {
      // 헤더 높이 (필요에 따라 조정)
      const headerOffset = 100;

      // 각 헤딩 요소의 현재 위치 확인
      const headingElements: { id: string; top: number }[] = [];

      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          // 요소의 위치 계산 (헤더 오프셋 적용)
          const top = element.getBoundingClientRect().top - headerOffset;
          headingElements.push({ id: item.id, top });
        }
      });

      // 뷰포트 상단에 가장 가까운 헤딩 찾기
      let activeHeading = null;
      let minAboveDistance = Infinity;
      let minBelowDistance = Infinity;

      for (const heading of headingElements) {
        if (heading.top <= 0) {
          // 화면 상단을 지났음
          const distance = Math.abs(heading.top);
          if (distance < minAboveDistance) {
            minAboveDistance = distance;
            activeHeading = heading;
          }
        } else {
          // 화면 상단보다 아래에 있음
          if (heading.top < minBelowDistance) {
            minBelowDistance = heading.top;
            // activeHeading이 없는 경우에만 설정 (위에 헤딩이 없을 경우)
            if (!activeHeading) {
              activeHeading = heading;
            }
          }
        }
      }

      // 활성 헤딩 ID 업데이트
      if (activeHeading) {
        setActiveId(activeHeading.id);
      } else if (headingElements.length > 0) {
        // 활성 헤딩이 감지되지 않았지만 헤딩이 있는 경우, 첫 번째 헤딩 선택
        setActiveId(headingElements[0].id);
      } else {
        // 헤딩이 없는 경우 활성화 ID 초기화
        setActiveId('');
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 초기 로드 시 활성 헤딩 설정 (약간 지연 적용)
    const initialTimeout = setTimeout(() => {
      updateActiveHeading();
    }, 300);

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      clearTimeout(initialTimeout);
    };
  }, [items]); // items가 변경될 때만 실행

  // TOC 항목 클릭 시 해당 헤딩으로 스크롤 이동
  const handleClick = (id: string) => {
    console.log('TOC 항목 클릭:', id);

    const element = document.getElementById(id);
    console.log('찾은 요소:', element);

    if (element) {
      // 화면 높이 계산
      const viewportHeight = window.innerHeight;

      // 상단 고정 헤더의 높이
      const headerHeight = 64; // 필요에 따라 조정

      // 스크롤 위치 설정: 헤딩이 화면의 상단에서 1/4 지점에 위치하도록
      const targetPosition =
        window.scrollY + element.getBoundingClientRect().top;
      const scrollPosition =
        targetPosition - viewportHeight * 0.25 - headerHeight;

      // 부드러운 스크롤 적용
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });

      // 클릭 시 활성 ID 업데이트 (즉시 피드백 제공)
      setActiveId(id);
    } else {
      console.warn(`ID가 "${id}"인 요소를 찾을 수 없습니다.`);

      // 대체 로직: 텍스트 내용으로 찾기
      const tocItem = items.find((item) => item.id === id);
      if (tocItem) {
        const headings = document.querySelectorAll(`h${tocItem.level}`);
        let targetHeading = null;

        headings.forEach((heading) => {
          if (heading.textContent?.trim() === tocItem.text) {
            targetHeading = heading as HTMLElement;
          }
        });

        if (targetHeading) {
          console.log('텍스트 내용으로 요소 찾음:', targetHeading);

          // 화면 높이 계산
          const viewportHeight = window.innerHeight;

          // 상단 고정 헤더의 높이
          const headerHeight = 64; // 필요에 따라 조정

          // 스크롤 위치 설정: 헤딩이 화면의 상단에서 1/4 지점에 위치하도록
          const targetPosition =
            window.scrollY + targetHeading.getBoundingClientRect().top;
          const scrollPosition =
            targetPosition - viewportHeight * 0.25 - headerHeight;

          // 부드러운 스크롤 적용
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });

          // 클릭 시 활성 ID 업데이트
          setActiveId(id);
        }
      }
    }
  };

  // 목차 항목이 없으면 렌더링하지 않음
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-48">
      <div className="flex items-center gap-2 mb-4">
        <TOCIcon className="w-6 h-6" />
        <div className="font-bold text-black">Chapter</div>
      </div>

      <div className="flex gap-2">
        <div className="w-0.5 bg-gray-200" />
        <ul className="flex-1 text-sm text-[#999999]">
          {items.map((item) => (
            <li
              key={item.id}
              className={`
                py-2 cursor-pointer transition-colors hover:text-black
                ${activeId === item.id ? 'text-black font-medium' : ''}
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
