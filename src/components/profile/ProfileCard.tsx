'use client';

import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { authState } from '@/store/auth';
import { useEffect, useState } from 'react';
import { getUserDetail } from '@/apis/users';
import type { UserDetail } from '@/types/blog';

export default function ProfileCard() {
  const auth = useRecoilValue(authState);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  console.log('Auth state in ProfileCard:', auth);

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (auth.isLoggedIn && auth.userInfo?.nickname) {
        try {
          console.log('Fetching user detail for:', auth.userInfo.nickname);
          const data = await getUserDetail(auth.userInfo.nickname);
          console.log('Fetched user detail:', data);
          setUserDetail(data);
        } catch (error) {
          console.error('Failed to fetch user detail:', error);
        }
      }
    };

    fetchUserDetail();
  }, [auth.isLoggedIn, auth.userInfo?.nickname]);

  if (!userDetail) return null;

  return (
    <div className="px-5 pt-5 pb-8 bg-[#fcfcfc] rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <div className="flex justify-center items-center">
        <div className="relative group w-[246px] h-[246px]">
          <Image
            src={
              userDetail.profileImageUrl || '/icon/Profile_Default_img@2x.svg'
            }
            alt="프로필"
            fill
            priority
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-200 rounded-lg" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="w-64 px-0.5 flex justify-center items-center gap-2.5">
            <div className="grow shrink basis-0 text-black text-xl font-bold leading-normal">
              {userDetail.nickname}
            </div>
          </div>
          <div className="self-stretch px-0.5 flex justify-start items-start gap-2.5">
            <div className="grow shrink basis-0 text-[#999999] text-sm font-medium leading-none">
              {userDetail.role}
            </div>
          </div>
        </div>
        <div className="self-stretch px-0.5 flex justify-center items-center gap-2.5">
          <div className="grow shrink basis-0 text-[#4c4c4c] text-sm font-medium leading-snug whitespace-pre-line">
            {userDetail.bio}
          </div>
        </div>
      </div>
    </div>
  );
}
