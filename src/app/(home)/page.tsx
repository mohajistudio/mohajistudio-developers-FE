'use client';

import { useState, useCallback } from 'react';
import { Search, Tags, FileText, Users } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import BlogPostCard from '@/components/blog/BlogPostCard';
import DeveloperCard from '@/components/common/DeveloperCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { mockPosts } from '@/mocks/posts';
import { mockTags } from '@/mocks/tags';
import { mockDevelopers } from '@/mocks/developers';
import { Tag } from '@/types/blog';

export default function HomePage() {
  // 선택된 태그들을 관리하는 상태
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // 현재 페이지 번호를 관리하는 상태
  const [page, setPage] = useState(1);
  // 추가 데이터 존재 여부 상태 (실제 구현시 API 응답에 따라 변경)
  const [hasMore] = useState(true);

  // 태그 선택/해제 처리 함수
  const handleTagSelect = useCallback((tagId: string) => {
    setSelectedTags(
      (prev) =>
        prev.includes(tagId)
          ? prev.filter((id) => id !== tagId) // 이미 선택된 태그면 제거
          : [...prev, tagId], // 선택되지 않은 태그면 추가
    );
  }, []);

  // 검색어 입력 처리 함수
  const handleSearch = useCallback((query: string) => {
    console.log('Search query:', query);
    // TODO: 실제 검색 로직 구현
  }, []);

  // 무한 스크롤 추가 데이터 로드 함수
  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
    // TODO: 추가 데이터 로드 로직 구현
  }, []);

  // 무한 스크롤 ref 설정
  const loadMoreRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
  });

  return (
    // 전체 레이아웃 컨테이너
    <div className="flex overflow-hidden flex-col items-center px-20 pt-9 pb-40 max-md:px-5 max-md:pt-9 max-md:pb-24 max-sm:p-5">
      {/* 컨텐츠 최대 너비 제한 컨테이너 */}
      <div className="flex flex-col max-w-full w-[1240px] max-sm:w-full">
        {/* 메인 컨텐츠 영역 */}
        <main className="flex flex-col self-end mt-16 max-w-full w-[1028px]">
          {/* 검색바 섹션 */}
          <SearchBar onSearch={handleSearch} />

          {/* 태그 및 게시물 컨테이너 */}
          <div className="mt-14">
            {/* 2단 레이아웃 (메인 + 사이드바) */}
            <div className="flex gap-5 max-md:flex-col">
              {/* 왼쪽 메인 컨텐츠 영역 */}
              <div className="w-[71%] max-md:w-full max-sm:w-full">
                <section>
                  {/* 태그 필터 섹션 */}
                  <div className="mb-14">
                    <div className="flex gap-2 items-center mb-3 text-xl font-bold text-black">
                      <Tags className="w-6 h-6 text-[#0A0A0A]" />
                      <div>Tags</div>
                    </div>
                    {/* 태그 목록 */}
                    <div className="flex flex-wrap gap-2 text-sm max-sm:justify-start">
                      {mockTags.map((tag) => (
                        <button
                          key={tag.id}
                          onClick={() => handleTagSelect(tag.id)}
                          className={`px-3 py-1.5 font-medium rounded-2xl transition-colors ${
                            selectedTags.includes(tag.id)
                              ? 'bg-[#0A0A0A] text-white'
                              : 'bg-[#E4E6EB] text-[#666666] hover:bg-gray-300'
                          }`}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 게시물 목록 섹션 */}
                  <div>
                    <div className="flex gap-2 items-center mb-3 text-xl font-bold text-black">
                      <FileText className="w-6 h-6 text-[#0A0A0A]" />
                      <div>All Post</div>
                    </div>
                    {/* 게시물 카드 목록 */}
                    <div className="flex flex-col gap-6">
                      {mockPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} />
                      ))}
                    </div>
                    {/* 무한 스크롤 트리거 요소 */}
                    <div ref={loadMoreRef} className="h-10" />
                  </div>
                </section>
              </div>

              {/* 오른쪽 사이드바 영역 */}
              <aside className="w-[29%] max-md:w-full max-sm:w-full">
                <div>
                  {/* 개발자 목록 헤더 */}
                  <div className="flex gap-2 items-center mb-3 text-xl font-bold text-black">
                    <Users className="w-6 h-6 text-[#0A0A0A]" />
                    <div>Developers</div>
                  </div>
                  {/* 개발자 카드 목록 */}
                  <div className="px-5 py-6 rounded-2xl bg-[#F9F9F9] shadow-[0px_0px_8px_rgba(0,0,0,0.02)]">
                    {mockDevelopers.map((developer) => (
                      <DeveloperCard
                        key={developer.id}
                        username={developer.username}
                        role={developer.role}
                        profileImage={developer.profileImage}
                      />
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
