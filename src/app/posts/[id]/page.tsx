'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Post, TocItem } from '@/types/blog';
import { formatDate } from '@/utils/date';
import TableOfContents from './TableOfContents';
import TagList from '@/components/common/TagList';
import ProfileImage from '@/components/common/ProfileImage';
import { mockPostDetail } from '@/mocks/posts';
import { ArrowUp } from 'lucide-react';

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

  // Top 버튼 클릭 핸들러
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = mockPostDetail;

        // 본문에서 헤딩 태그들을 추출하여 TOC 아이템 생성
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.content, 'text/html');
        const headings = doc.querySelectorAll('h1, h2, h3');

        // TOC 아이템 생성
        const items: TocItem[] = Array.from(headings).map((heading, index) => ({
          id: `heading-${index}`,
          text: heading.textContent || '',
          level: parseInt(heading.tagName[1]),
        }));

        setTocItems(items);

        // 본문의 헤딩 태그들에 id와 스타일 추가
        let contentWithIds = data.content;
        items.forEach((item, index) => {
          const level = item.level;
          const styleClass =
            level === 1
              ? 'text-[30px] mt-8 mb-4'
              : level === 2
                ? 'text-[24px] mt-6 mb-3'
                : 'text-[20px] mt-4 mb-2';

          contentWithIds = contentWithIds.replace(
            `<h${level}>${item.text}</h${level}>`,
            `<h${level} id="${item.id}" class="text-black font-bold ${styleClass}">${item.text}</h${level}>`,
          );
        });

        // 단락 스타일 추가
        contentWithIds = contentWithIds.replace(
          /<p>(.*?)<\/p>/g,
          '<p class="mb-4 text-base text-[#4D4D4D]">$1</p>',
        );

        data.content = contentWithIds;
        setPost(data);
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
                  <ProfileImage username={post.user.username} />
                  <span className="font-bold text-black">
                    {post.user.username}
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
              <div
                className="text-[#4D4D4D] leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />

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
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
