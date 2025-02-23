'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { Tag } from '@/types/blog';

interface VerticalTagListProps {
  tags: Tag[];
}

export default function VerticalTagList({ tags }: VerticalTagListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 선택된 태그들 가져오기
  const selectedTagIds =
    searchParams.get('tags')?.split(',').filter(Boolean) || [];
  const selectedTags = tags.filter((tag) => selectedTagIds.includes(tag.id));

  const handleTagClick = (tag: Tag) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (selectedTagIds.includes(tag.id)) {
      // 이미 선택된 태그면 제거
      const newTags = selectedTagIds.filter((id) => id !== tag.id);
      if (newTags.length > 0) {
        newSearchParams.set('tags', newTags.join(','));
      } else {
        newSearchParams.delete('tags');
      }
    } else {
      // 선택되지 않은 태그면 추가
      newSearchParams.set('tags', [...selectedTagIds, tag.id].join(','));
    }

    // URL 업데이트
    router.push(`/?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleTagClick(tag)}
          className={`px-4 py-2 rounded-full text-sm transition-colors ${
            selectedTags.some((t) => t.id === tag.id)
              ? 'bg-black text-white'
              : 'bg-[#E4E6EB] text-[#666666] hover:bg-[#C9CDD6]'
          }`}
        >
          {tag.title}
        </button>
      ))}
    </div>
  );
}
