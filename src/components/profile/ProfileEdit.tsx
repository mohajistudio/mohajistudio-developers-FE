'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { authState } from '@/store/auth';
import { UserDetail, Contact } from '@/types/blog';
import { getUserDetail, updateUserProfile, uploadMedia } from '@/apis/users';
import { useToast } from '@/contexts/ToastContext';

interface ProfileEditProps {
  userId: string;
  onCancel: () => void;
  initialUserData?: UserDetail;
  onProfileUpdate?: (updatedData: UserDetail) => void;
}

export default function ProfileEdit({
  userId,
  onCancel,
  initialUserData,
  onProfileUpdate = () => {},
}: ProfileEditProps) {
  const auth = useRecoilValue(authState);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    jobRole: '',
    bio: '',
    profileImageId: '',
    contacts: [] as Contact[],
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 컴포넌트 렌더링 시 props 확인
  //   console.log('ProfileEdit 렌더링, props:', { userId, initialUserData });

  // 사용자 정보 불러오기
  useEffect(() => {
    if (initialUserData) {
      setUserDetail(initialUserData);
      setFormData({
        nickname: initialUserData.nickname || '',
        jobRole: initialUserData.jobRole || initialUserData.role || '',
        bio: initialUserData.bio || '',
        profileImageId: '',
        contacts: initialUserData.contacts || [],
      });

      if (initialUserData.profileImageUrl) {
        setPreviewImage(initialUserData.profileImageUrl);
      }
    } else if (userId && auth.userInfo?.nickname) {
      fetchUserDetail(auth.userInfo.nickname);
    }
  }, [userId, auth.userInfo, initialUserData]);

  const fetchUserDetail = async (nickname: string) => {
    try {
      setIsLoading(true);
      const data = await getUserDetail(nickname);
      setUserDetail(data);

      // 폼 데이터 초기화
      setFormData({
        nickname: data.nickname || '',
        jobRole: data.jobRole || data.role || '',
        bio: data.bio || '',
        profileImageId: '', // 기존 이미지 ID는 서버에 저장되어 있으므로 빈 값으로 시작
        contacts: data.contacts || [],
      });

      // 프로필 이미지 미리보기 설정
      if (data.profileImageUrl) {
        setPreviewImage(data.profileImageUrl);
      }
    } catch (error) {
      console.error('사용자 정보를 불러오는데 실패했습니다:', error);
      showToast('error', {
        title: '사용자 정보 로드 실패',
        description:
          '사용자 정보를 불러오는데 실패했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);

      // 파일 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 이미지 업로드 API 호출
      const formData = new FormData();
      formData.append('file', file);

      const uploadedMedia = await uploadMedia(formData);

      // 업로드된 이미지 ID 저장
      setFormData((prev) => ({
        ...prev,
        profileImageId: uploadedMedia.id,
      }));

      showToast('success', {
        title: '이미지 업로드 성공',
        description: '이미지가 성공적으로 업로드되었습니다.',
      });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      showToast('error', {
        title: '이미지 업로드 실패',
        description: '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({
      ...prev,
      profileImageId: '',
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    showToast('info', {
      title: '이미지 삭제',
      description: '프로필 이미지가 삭제되었습니다.',
    });
  };

  // 프로필 저장 핸들러
  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      // userId 확인
      if (!userId) {
        showToast('error', {
          title: '사용자 ID 오류',
          description: '사용자 ID가 없습니다. 다시 로그인해주세요.',
        });
        return;
      }

      // 필수 필드 검증
      if (!formData.nickname.trim()) {
        showToast('error', {
          title: '입력 오류',
          description: '닉네임을 입력해주세요.',
        });
        return;
      }

      //   console.log('프로필 업데이트 요청, userId:', userId);

      // API 호출을 위한 데이터 준비
      const updateData = {
        nickname: formData.nickname,
        job_role: formData.jobRole,
        bio: formData.bio,
        profileImageId: formData.profileImageId || undefined,
        contacts: formData.contacts.map((contact) => ({
          contactTypeId: contact.id,
          displayName: contact.displayName,
          url: contact.url,
        })),
      };

      // 프로필 업데이트 API 호출
      await updateUserProfile(userId, updateData);

      showToast('success', {
        title: '프로필 업데이트 성공',
        description: '프로필이 성공적으로 업데이트되었습니다.',
      });

      // 사용자 데이터 다시 불러오기
      if (auth.userInfo?.nickname) {
        const updatedUserData = await getUserDetail(auth.userInfo.nickname);
        onProfileUpdate(updatedUserData);
      }

      router.refresh();
      onCancel();
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      showToast('error', {
        title: '프로필 업데이트 실패',
        description: '프로필 업데이트에 실패했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="px-5 pt-5 pb-8 bg-[#fcfcfc] rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center h-[400px]">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5 pb-8 bg-[#fcfcfc] rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col items-center">
        <div
          className="relative rounded-lg overflow-hidden mb-4 flex items-center justify-center"
          style={{
            width: '246px',
            height: '246px',
            minWidth: '246px',
            minHeight: '246px',
            maxWidth: '246px',
            maxHeight: '246px',
            backgroundColor: '#E4E6EB',
          }}
        >
          {previewImage ? (
            <Image
              src={previewImage}
              alt="프로필 이미지"
              width={246}
              height={246}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
              className="rounded-lg"
            />
          ) : (
            <div className="w-full h-full rounded-lg bg-[#E4E6EB] flex items-center justify-center">
              <Image
                src="/icon/Profile_Default_img@2x.svg"
                alt="기본 프로필"
                width={246}
                height={246}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleRemoveImage}
          className="w-full h-[40px] flex justify-center items-center gap-2 py-3 px-4 border border-[#F44336] text-[#F44336] rounded-lg font-medium mb-6 bg-[#FCFCFC] shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)] hover:bg-[#FFF5F5] transition-colors"
        >
          이미지 삭제
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="mb-5">
        <label className="block text-[#4D4D4D] text-[14pt] font-medium mb-2">
          닉네임
        </label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-[#E4E6EB] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#FF8C42] bg-white text-[#666666] text-[14px] font-medium leading-[16px]"
          placeholder="닉네임을 입력하세요"
        />
      </div>

      <div className="mb-5">
        <label className="block text-[#4D4D4D] text-[14pt] font-medium mb-2">
          커리어
        </label>
        <input
          type="text"
          name="jobRole"
          value={formData.jobRole}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-[#E4E6EB] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#FF8C42] bg-white text-[#666666] text-[14px] font-medium leading-[16px]"
          placeholder="직군을 입력하세요"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#4D4D4D] text-[14pt] font-medium mb-2">
          소개
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-[#E4E6EB] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#FF8C42] bg-white text-[#666666] text-[14px] font-medium leading-[16px] resize-none"
          placeholder="자기소개를 입력하세요"
          rows={4}
          maxLength={100}
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex justify-center items-center px-6 py-2 border border-[#E4E6EB] rounded-lg hover:bg-[#F7F8FA] transition-colors text-[#666666] font-medium gap-2.5 flex-1"
        >
          취소
        </button>
        <button
          onClick={handleSaveProfile}
          disabled={isLoading}
          className="flex justify-center items-center px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#388E3C] transition-colors disabled:opacity-50 font-medium gap-2.5 flex-1"
        >
          {isLoading ? '저장 중...' : '저장'}
        </button>
      </div>
    </div>
  );
}
