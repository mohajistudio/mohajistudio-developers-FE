'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Post, TocItem } from '@/types/blog';
import { formatDate } from '@/utils/date';
import { normalizeMarkdown, extractTocItems } from '@/utils/markdown';
import TableOfContents from './TableOfContents';
import TagList from '@/components/common/TagList';
import ProfileImage from '@/components/common/ProfileImage';
import { getPost } from '@/apis/posts';
import { ArrowUp } from 'lucide-react';
import MarkdownPreview from '@/components/editor/MarkdownPreview';

export default function PostDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [showTopButton, setShowTopButton] = useState(false);

  // 스크롤 위치에 따라 Top 버튼 표시 여부 결정
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 현재 활성화된 헤딩 업데이트 함수 (TableOfContents에 활성화 ID 전달)
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  // 헤딩 요소 감시를 위한 IntersectionObserver 설정
  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 보이는 헤딩 중 첫 번째 것을 활성 헤딩으로 설정
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id);

        if (visibleHeadings.length > 0) {
          setActiveHeadingId(visibleHeadings[0]);
        }
      },
      {
        rootMargin: '-20% 0% -35% 0%', // 상단 20%, 하단 35% 영역은 무시
        threshold: 0.1, // 요소의 10%가 보이면 감지
      },
    );

    // 모든 헤딩 요소를 관찰
    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tocItems]);

  // Top 버튼 클릭 핸들러
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(params.id);
        console.log('서버에서 받아온 원본 content:', data.content);

        // 마크다운 정규화 적용
        const formattedContent = normalizeMarkdown(data.content);
        console.log('정규화 후 content:', formattedContent);

        // 목차 아이템 추출
        const items = extractTocItems(formattedContent);
        console.log('추출된 TOC 항목:', items);

        setTocItems(items);
        setPost({
          ...data,
          content: formattedContent,
        });
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다:', error);
        router.push('/');
      }
    };

    fetchPost();
  }, [params.id, router]);

  if (!post) return null;

  return (
    <div className="flex flex-col items-center px-20 pt-9 pb-36 bg-[#F2F3F5] relative">
      <div className="w-full max-w-[1240px]">
        {/* 상단 네비게이션 */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-black font-bold"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-current"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex gap-5">
          {/* 게시글 영역 */}
          <div className="flex-[0.84]">
            <article className="bg-white rounded-2xl shadow-sm p-16">
              <header className="mb-6">
                <h1 className="text-[30px] font-bold text-black mb-2">
                  {post.title}
                </h1>
                <time className="text-[#999999] text-sm">
                  {formatDate(post.publishedAt || post.createdAt)}
                </time>
              </header>

              {/* 작성자 정보 */}
              <div className="py-6 border-y border-[#F2F3F5]">
                <div className="flex items-center gap-3">
                  <ProfileImage nickname={post.user.nickname} />
                  <span className="font-bold text-black">
                    {post.user.nickname}
                  </span>
                </div>
              </div>

              {/* 태그 목록 */}
              <div className="my-6">
                <TagList tags={post.tags} />
              </div>

              {/* 썸네일 이미지 */}
              {post.thumbnail && (
                <div className="rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={1000}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
              )}

              {/* 본문 내용 */}
              <div className="prose prose-neutral max-w-none">
                <MarkdownPreview
                  content={post.content}
                  title="" // 제목은 이미 상단에 표시되어 있으므로 빈 문자열
                  tocItems={tocItems} // TOC 항목 전달
                />
              </div>

              {/* Top 버튼 */}
              <div className="flex justify-end mt-10">
                <button
                  onClick={scrollToTop}
                  className="w-11 h-11 bg-[#F2F3F5] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  aria-label="맨 위로 이동"
                >
                  <ArrowUp className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </article>
          </div>

          {/* 사이드바 영역 */}
          <div className="flex-[0.16]">
            <TableOfContents items={tocItems} activeId={activeHeadingId} />
          </div>
        </div>
      </div>
    </div>
  );
}
