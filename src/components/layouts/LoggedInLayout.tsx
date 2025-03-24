import SearchBar from '@/components/common/SearchBar';
import PostListClient from '@/components/blog/PostListClient';
import Image from 'next/image';
import TagListContainer from '@/components/common/TagListContainer';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileEdit from '@/components/profile/ProfileEdit';
import Contact from '@/components/profile/Contact';
import type {
  PaginatedResponse,
  Post,
  User,
  Tag,
  Contact as ContactType,
} from '@/types/blog';
import { useRecoilValue } from 'recoil';
import { authState } from '@/store/auth';
import VerticalTagList from '@/components/common/VerticalTagList';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import DeleteAccount from '../profile/DeleteAccount';
import { getUserDetail } from '@/apis/users';
import { UserDetail } from '@/types/blog';
import ContactEditModal from '../profile/ContactEditModal';
import { updateUserContacts } from '@/apis/contact-types';

interface LoggedInLayoutProps {
  initialData: PaginatedResponse<Post>;
  developers: User[];
  tags: Tag[];
  searchParams: { [key: string]: string | string[] | undefined };
  profileUserId?: string; // 현재 보고 있는 프로필의 사용자 ID
}

export default function LoggedInLayout({
  initialData,
  tags,
  searchParams,
  profileUserId, // 프로필 페이지에서 전달받은 사용자 ID
}: LoggedInLayoutProps) {
  const auth = useRecoilValue(authState);
  const pathname = usePathname();
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);
  const [fetchedUserId, setFetchedUserId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false); // 편집 모드 상태
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); // 연락처 편집 모달 상태
  const profileCardRef = useRef(null);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  useEffect(() => {
    if (profileUserId) {
      setCurrentProfileId(profileUserId);
      return;
    }

    // URL에서 프로필 ID 추출 시도
    const profilePathMatch = pathname.match(/\/profile\/([^\/]+)/);
    if (profilePathMatch && profilePathMatch[1]) {
      setCurrentProfileId(profilePathMatch[1]);
      return;
    }

    // 홈페이지('/')인 경우 또는 다른 페이지에서는 로그인한 사용자의 ID 사용
    if (auth.userInfo?.id) {
      setCurrentProfileId(auth.userInfo.id);
    } else {
      setCurrentProfileId(null);
    }
  }, [profileUserId, pathname, auth.userInfo]);

  // ProfileCard에서 가져온 사용자 ID를 사용
  useEffect(() => {
    if (auth.isLoggedIn && auth.userInfo) {
      setCurrentProfileId(auth.userInfo.id);
    }
  }, [auth.isLoggedIn, auth.userInfo]);

  const handleUserIdFetched = (userId: string) => {
    setFetchedUserId(userId);
  };

  const isCurrentUserProfile =
    auth.isLoggedIn && auth.userInfo?.id === currentProfileId;

  // 프로필 편집 모드 전환
  const handleEditProfile = () => {
    // console.log('handleEditProfile 호출');
    // 직접 편집 모드 설정
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (auth.isLoggedIn && auth.userInfo?.nickname) {
        try {
          const data = await getUserDetail(auth.userInfo.nickname);
          setUserDetail(data);
        } catch (error) {
          console.error('Failed to fetch user detail:', error);
        }
      }
    };

    fetchUserDetail();
  }, [auth.isLoggedIn, auth.userInfo?.nickname]);

  const handleProfileUpdate = (updatedData: UserDetail) => {
    // console.log('프로필 업데이트됨:', updatedData);
    setUserDetail(updatedData);
  };

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  const handleSaveContacts = async (updatedContacts: ContactType[]) => {
    if (!currentProfileId) return;

    try {
      const response = await updateUserContacts(
        currentProfileId,
        updatedContacts,
      );

      if (auth.isLoggedIn && auth.userInfo?.nickname) {
        const updatedUserDetail = await getUserDetail(auth.userInfo.nickname);
        setUserDetail(updatedUserDetail);
      }
    } catch (error) {
      console.error('연락처 업데이트 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex overflow-hidden flex-col items-center px-20 pt-9 pb-40 max-md:px-5 max-md:pt-9 max-md:pb-24 max-sm:p-5">
      <div className="flex flex-col max-w-full w-[1240px] max-sm:w-full">
        {/* SearchBar 영역 */}
        <div className="flex gap-8">
          <div className="w-[180px] shrink-0" />
          <div className="w-[720px]">
            <SearchBar />
          </div>
          <div className="w-[286px] shrink-0" />
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="mt-8 flex gap-8">
          {/* 좌측 Tags 섹션 */}
          <aside className="w-[180px] shrink-0">
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
          <aside className="w-[286px] shrink-0">
            <div className="sticky top-[100px]">
              <div className="flex justify-between items-center mb-3">
                <h2 className="flex gap-2 items-center h-[42px] text-base font-bold text-black">
                  <Image
                    src="/icon/User.svg"
                    alt="프로필"
                    width={24}
                    height={24}
                  />
                  <span>Profile</span>
                </h2>
                {isCurrentUserProfile && (
                  <button
                    onClick={isEditMode ? handleCancelEdit : handleEditProfile}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Image
                      src={
                        isEditMode
                          ? '/icon/toast/Close.svg'
                          : '/icon/Post_edit.svg'
                      }
                      alt={isEditMode ? '닫기' : '프로필 수정'}
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {isEditMode && isCurrentUserProfile ? (
                  <ProfileEdit
                    userId={userDetail?.id || ''}
                    onCancel={handleCancelEdit}
                    initialUserData={userDetail || undefined}
                    onProfileUpdate={handleProfileUpdate}
                  />
                ) : (
                  <ProfileCard
                    userId={currentProfileId || undefined}
                    onUserIdFetched={handleUserIdFetched}
                    ref={profileCardRef}
                  />
                )}

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h2
                      className="flex gap-2 items-center h-[42px] text-base font-bold text-black cursor-pointer"
                      onClick={
                        isCurrentUserProfile
                          ? handleOpenContactModal
                          : undefined
                      }
                    >
                      <Image
                        src="/icon/Contact.svg"
                        alt="연락처"
                        width={24}
                        height={24}
                      />
                      <span>Contact</span>
                    </h2>
                    {isCurrentUserProfile && !isEditMode && (
                      <button onClick={handleOpenContactModal}>
                        <Image
                          src="/icon/Add_small.svg"
                          alt="연락처 추가"
                          width={24}
                          height={24}
                          className="cursor-pointer"
                        />
                      </button>
                    )}
                  </div>
                  <Contact userId={currentProfileId || undefined} />
                </div>

                {isCurrentUserProfile && !isEditMode && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="flex gap-2 items-center h-[42px] text-base font-bold text-black">
                        <Image
                          src="/icon/Logout.svg"
                          alt="회원탈퇴"
                          width={24}
                          height={24}
                        />
                        <span>Delete Account</span>
                      </h2>
                    </div>
                    <DeleteAccount />
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 연락처 편집 모달 */}
      {isCurrentUserProfile && (
        <ContactEditModal
          isOpen={isContactModalOpen}
          onClose={handleCloseContactModal}
          onSave={handleSaveContacts}
          initialContacts={userDetail?.contacts || []}
        />
      )}
    </div>
  );
}
