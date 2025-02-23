'use client';

import { Tag as TagType } from '@/types/blog';

interface TagProps {
  tag: TagType;
  onClick?: (tag: TagType) => void;
  isSelected?: boolean;
}

export default function Tag({ tag, onClick, isSelected }: TagProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(tag)}
      className={`
        px-3 py-1 text-sm font-medium rounded-full transition-colors
        ${
          isSelected
            ? 'bg-[#0A0A0A] text-[#FFFFFF]'
            : 'bg-[#E4E6EB] text-[#4D4D4D] hover:bg-[#C9CDD6]'
        }
      `}
    >
      {tag.title}
    </button>
  );
}
