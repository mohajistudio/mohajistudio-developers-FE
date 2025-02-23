import SearchBar from '@/components/common/SearchBar';
import PostListClient from '@/components/blog/PostListClient';
import Image from 'next/image';
import TagListContainer from '@/components/common/TagListContainer';
import ProfileCard from '@/components/profile/ProfileCard';
import Contact from '@/components/profile/Contact';
import type { PaginatedResponse, Post, User, Tag } from '@/types/blog';
import { useRecoilValue } from 'recoil';
import { authState } from '@/store/auth';
import VerticalTagList from '@/components/common/VerticalTagList';

interface LoggedInLayoutProps {
  initialData: PaginatedResponse<Post>;
  developers: User[];
  tags: Tag[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function LoggedInLayout({
  initialData,
  tags,
  searchParams,
}: LoggedInLayoutProps) {
  const auth = useRecoilValue(authState);

  return (
    <div className="flex overflow-hidden flex-col items-center px-20 pt-9 pb-40 max-md:px-5 max-md:pt-9 max-md:pb-24 max-sm:p-5">
      <div className="flex flex-col max-w-full w-[1240px] max-sm:w-full">
        {/* SearchBar 영역 */}
        <div className="flex gap-5">
          <div className="w-[240px] shrink-0" />
          <div className="w-[720px]">
            <SearchBar />
          </div>
          <div className="w-[240px] shrink-0" />
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="mt-14 flex gap-5">
          {/* 좌측 Tags 섹션 */}
          <aside className="w-[240px] shrink-0">
            <div className="sticky top-[100px]">
              <h2 className="flex gap-2 items-center h-[42px] text-base font-bold text-black mb-3">
                <Image src="/icon/Tag.svg" alt="태그" width={24} height={24} />
                <span>Tags</span>
              </h2>
              <div className="flex flex-col gap-2">
                <VerticalTagList tags={tags} />
              </div>
            </div>
          </aside>

          {/* All Posts 섹션 */}
          <div className="w-[720px]">
            <h2 className="flex gap-2 items-center h-[42px] text-base font-bold text-black mb-3">
              <Image src="/icon/File.svg" alt="게시물" width={24} height={24} />
              <span>All Posts</span>
            </h2>
            <PostListClient
              initialData={initialData}
              searchParams={searchParams}
            />
          </div>

          {/* Profile 섹션 */}
          <aside className="w-[240px] shrink-0">
            <div className="sticky top-[100px]">
              <h2 className="flex gap-2 items-center h-[42px] text-base font-bold text-black mb-3">
                <Image
                  src="/icon/User.svg"
                  alt="프로필"
                  width={24}
                  height={24}
                />
                <span>Profile</span>
              </h2>
              <div className="space-y-5">
                <ProfileCard />
                <div>
                  <h2 className="flex gap-2 items-center h-[42px] text-base font-bold text-black mb-3">
                    <Image
                      src="/icon/Contact.svg"
                      alt="연락처"
                      width={24}
                      height={24}
                    />
                    <span>Contact</span>
                  </h2>
                  <Contact />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
