'use client';

import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { authState } from '@/store/auth';
import { useEffect, useState } from 'react';
import { getUserDetail } from '@/apis/users';
import type { UserDetail } from '@/types/blog';

// 임시 데이터
const MOCK_CONTACTS = [
  {
    id: '1',
    name: 'github',
    imageUrl: '/icon/github.svg',
    displayName: 'GitHub',
    url: 'https://github.com/leech',
  },
  {
    id: '2',
    name: 'email',
    imageUrl: '/icon/email.svg',
    displayName: 'Email',
    url: 'mailto:cksgh5477@gmail.com',
  },
  {
    id: '3',
    name: 'tistory',
    imageUrl: '/icon/tistory.svg',
    displayName: 'Tistory',
    url: 'https://leech.tistory.com',
  },
  {
    id: '4',
    name: 'blog',
    imageUrl: '/icon/blog.svg',
    displayName: 'Blog',
    url: 'https://blog.mohaji.dev',
  },
];

interface ContactProps {
  userId?: string;
}

export default function Contact({ userId }: ContactProps) {
  const auth = useRecoilValue(authState);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (auth.isLoggedIn && auth.userInfo?.nickname) {
        try {
          const data = await getUserDetail(auth.userInfo.nickname);
          // 임시로 목데이터 사용
          setUserDetail({
            ...data,
            contacts: MOCK_CONTACTS,
          });
        } catch (error) {
          console.error('Failed to fetch user detail:', error);
          // API 호출 실패시에도 목데이터 표시
          setUserDetail({
            ...userDetail,
            contacts: MOCK_CONTACTS,
          } as UserDetail);
        }
      }
    };

    fetchUserDetail();
  }, [auth.isLoggedIn, auth.userInfo?.nickname]);

  // 목데이터 사용을 위해 조건 변경
  if (!auth.isLoggedIn) return null;

  return (
    <div className="h-60 p-3 bg-[#fcfcfc] rounded-2xl shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)] flex flex-col justify-start items-start gap-2">
      {MOCK_CONTACTS.map((contact) => (
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
              {contact.name}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
