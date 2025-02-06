import React from 'react';
import { Tag } from '@/types/blog';

interface TagListProps {
  tags: Tag[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray2 rounded-full"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
}
