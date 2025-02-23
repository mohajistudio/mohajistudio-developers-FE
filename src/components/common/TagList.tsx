'use client';

import React from 'react';
import { Tag as TagType } from '@/types/blog';
import Tag from './Tag';

interface TagListProps {
  tags: TagType[];
  onTagClick?: (tag: TagType) => void;
  selectedTags?: TagType[];
}

export default function TagList({
  tags,
  onTagClick,
  selectedTags = [],
}: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag) => (
        <Tag
          key={tag.id}
          tag={tag}
          onClick={onTagClick}
          isSelected={selectedTags.some(
            (selectedTag) => selectedTag.id === tag.id,
          )}
        />
      ))}
    </div>
  );
}
