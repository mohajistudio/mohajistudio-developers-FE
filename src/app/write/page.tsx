// src/app/write/page.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { WritePostData, PostStatus } from '@/types/blog';
import WriteHeader from '@/components/editor/WriteHeader';
import MarkdownPreview from '@/components/editor/MarkdownPreview';

// 에디터 컴포넌트 동적 임포트
const MarkdownEditor = dynamic(
  () => import('@/components/editor/MarkdownEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-surface2 flex items-center justify-center">
        에디터 로딩중...
      </div>
    ),
  },
);

export default function WritePage() {
  const [postData, setPostData] = useState<WritePostData>({
    title: '',
    content: '',
    summary: '',
    tags: [],
    status: PostStatus.DRAFT,
  });

  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveDraft = async () => {
    if (!postData.title.trim() && !postData.content.trim()) {
      alert('제목 또는 내용을 입력해주세요.');
      return;
    }

    try {
      const draftData = {
        ...postData,
        status: PostStatus.DRAFT,
        summary:
          postData.content.slice(0, 150) +
          (postData.content.length > 150 ? '...' : ''),
        updatedAt: new Date().toISOString(),
      };

      console.log('임시저장:', draftData);
      alert('임시저장 되었습니다.');
    } catch (error) {
      console.error('임시저장 실패:', error);
      alert('임시저장에 실패했습니다.');
    }
  };

  const handlePublish = async () => {
    if (!postData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!postData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (postData.tags.length === 0) {
      alert('태그를 하나 이상 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const publishData = {
        ...postData,
        status: PostStatus.PUBLISHED,
        summary:
          postData.content.slice(0, 150) +
          (postData.content.length > 150 ? '...' : ''),
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('출간하기:', publishData);
      alert('성공적으로 출간되었습니다.');
    } catch (error) {
      console.error('출간 실패:', error);
      alert('출간에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (title: string) => {
    setPostData((prev) => ({ ...prev, title }));
  };

  const handleContentChange = (content: string) => {
    setPostData((prev) => ({ ...prev, content }));
  };

  const handleAddTag = (tag: string) => {
    if (!postData.tags.includes(tag)) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  return (
    <div className="flex h-screen">
      {/* 왼쪽 에디터 패널 */}
      <div className="w-1/2 flex flex-col bg-surface2">
        <WriteHeader
          title={postData.title}
          tags={postData.tags}
          tagInput={tagInput}
          onChangeTitle={handleTitleChange}
          onChangeTagInput={setTagInput}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
        <div className="flex-1">
          <MarkdownEditor onChangeContent={handleContentChange} />
        </div>
        {/* 하단 버튼 영역 */}
        <div className="h-12 border-t border-bg2 bg-surface2 flex items-center px-4">
          <div className="flex-1">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-primary text-sm"
            >
              ← 나가기
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveDraft}
              className="text-gray-600 hover:text-primary text-sm"
            >
              임시저장
            </button>
            <button
              onClick={handlePublish}
              disabled={isSubmitting}
              className="px-4 py-1.5 bg-third text-white rounded-md hover:opacity-90 disabled:opacity-50 text-sm"
            >
              {isSubmitting ? '저장 중...' : '출간하기'}
            </button>
          </div>
        </div>
      </div>

      {/* 오른쪽 프리뷰 패널 */}
      <div className="w-1/2">
        <MarkdownPreview content={postData.content} title={postData.title} />
      </div>
    </div>
  );
}
