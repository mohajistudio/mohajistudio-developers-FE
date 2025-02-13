import { getPostsServer } from '@/apis/posts';
import SearchBar from '@/components/common/SearchBar';
import TagList from '@/components/common/TagList';
import PostListClient from '@/components/blog/PostListClient';
import { mockTags } from '@/mocks/tags';
import { mockDevelopers } from '@/mocks/developers';
import Image from 'next/image';
import DeveloperCard from '@/components/common/DeveloperCard';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 초기 데이터 서버에서 페칭
  const initialData = await getPostsServer({
    page: 0,
    size: 20,
    search: searchParams.search as string,
    tags: Array.isArray(searchParams.tags)
      ? searchParams.tags
      : searchParams.tags
        ? [searchParams.tags]
        : undefined,
  });

  return (
    <div className="flex overflow-hidden flex-col items-center px-20 pt-9 pb-40 max-md:px-5 max-md:pt-9 max-md:pb-24 max-sm:p-5">
      <div className="flex flex-col max-w-full w-[1240px] max-sm:w-full">
        <main className="flex flex-col self-end mt-16 max-w-full w-[1028px]">
          <SearchBar />

          <div className="mt-14">
            <div className="flex gap-5 max-md:flex-col">
              <div className="w-[71%] max-md:w-full max-sm:w-full">
                <section>
                  {/* 태그 섹션 */}
                  <div className="mb-14">
                    <div className="flex gap-2 items-center mb-3 text-base font-bold text-black">
                      <Image
                        src="/icon/Tag.svg"
                        alt="태그"
                        width={24}
                        height={24}
                      />
                      <div>Tags</div>
                    </div>
                    <TagList tags={mockTags} />
                  </div>

                  {/* 게시글 목록 섹션 */}
                  <div>
                    <div className="flex gap-2 items-center mb-3 text-base font-bold text-black">
                      <Image
                        src="/icon/File.svg"
                        alt="게시물"
                        width={24}
                        height={24}
                      />
                      <div>All Post</div>
                    </div>
                    {/* 게시물 카드 목록 */}
                    <PostListClient
                      initialData={initialData}
                      searchParams={searchParams}
                    />
                  </div>
                </section>
              </div>

              {/* 오른쪽 사이드바 영역 */}
              <aside className="w-[29%] max-md:w-full max-sm:w-full">
                <div>
                  {/* 개발자 목록 헤더 */}
                  <div className="flex gap-2 items-center mb-3 text-base font-bold text-black">
                    <Image
                      src="/icon/Users.svg"
                      alt="개발자"
                      width={24}
                      height={24}
                    />
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
