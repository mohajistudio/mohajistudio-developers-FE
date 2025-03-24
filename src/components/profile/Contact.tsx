'use client';

import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { authState } from '@/store/auth';
import { useEffect, useState } from 'react';
import { getUserDetail } from '@/apis/users';
import type { UserDetail, Contact as ContactType } from '@/types/blog';

interface ContactProps {
  userId?: string;
}

export default function Contact({ userId }: ContactProps) {
  const auth = useRecoilValue(authState);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (userId || (auth.isLoggedIn && auth.userInfo?.nickname)) {
        setIsLoading(true);
        try {
          // userId가 있으면 해당 사용자의 정보를, 없으면 로그인한 사용자의 정보를 가져옴
          const targetNickname = userId ? userId : auth.userInfo?.nickname;

          const data = await getUserDetail(targetNickname as string);
          setUserDetail(data);
        } catch (error) {
          console.error('Failed to fetch user detail:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserDetail();
  }, [userId, auth.isLoggedIn, auth.userInfo?.nickname]);

  if (isLoading) {
    return (
      <div className="h-60 p-3 bg-[#fcfcfc] rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)] flex items-center justify-center">
        <p className="text-[#666666]">로딩 중...</p>
      </div>
    );
  }

  if (!userDetail?.contacts || userDetail.contacts.length === 0) {
    return (
      <div className="h-60 p-3 bg-[#fcfcfc] rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)] flex items-center justify-center">
        <p className="text-[#666666]">등록된 연락처가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="h-auto min-h-60 p-3 bg-[#fcfcfc] rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)] flex flex-col justify-start items-start gap-2">
      {userDetail.contacts.map((contact) => (
        <a
          key={contact.id}
          href={contact.url}
          target="_blank"
          rel="noopener noreferrer"
          className="self-stretch px-2 py-3 bg-[#fcfcfc] rounded-lg flex justify-start items-center gap-3 hover:bg-[#F2F3F5] transition-colors"
        >
          <Image
            src={contact.imageUrl}
            alt={contact.displayName}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full"
          />
          <div className="grow shrink basis-0 h-[22px] flex justify-center items-center gap-2.5">
            <div className="grow shrink basis-0 text-[#4c4c4c] text-sm font-medium leading-snug">
              {contact.displayName || contact.name}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
