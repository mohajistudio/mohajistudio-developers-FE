'use client';

import { useRecoilValue } from 'recoil';
import { authState } from '@/store/auth';
import LoggedInLayout from '@/components/layouts/LoggedInLayout';
import LoggedOutLayout from '@/components/layouts/LoggedOutLayout';
import type { PaginatedResponse, Post, User, Tag } from '@/types/blog';

interface HomeContainerProps {
  initialData: PaginatedResponse<Post>;
  developers: User[];
  tags: Tag[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function HomeContainer({
  initialData,
  developers,
  tags,
  searchParams,
}: HomeContainerProps) {
  const auth = useRecoilValue(authState);

  return auth.isLoggedIn ? (
    <LoggedInLayout
      initialData={initialData}
      developers={developers}
      tags={tags}
      searchParams={searchParams}
    />
  ) : (
    <LoggedOutLayout
      initialData={initialData}
      developers={developers}
      tags={tags}
      searchParams={searchParams}
    />
  );
}
