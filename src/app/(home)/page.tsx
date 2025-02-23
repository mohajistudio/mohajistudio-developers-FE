import { getPostsServer } from '@/apis/posts';
import { getDevelopers } from '@/apis/users';
import { getTags } from '@/apis/tags';
import HomeContainer from '@/components/home/HomeContainer';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 초기 데이터 서버에서 페칭
  const [postsResult, developersResult, tagsResult] = await Promise.allSettled([
    getPostsServer({
      page: 0,
      size: 20,
      search: searchParams.search as string,
      tags: Array.isArray(searchParams.tags)
        ? searchParams.tags
        : searchParams.tags
          ? [searchParams.tags]
          : undefined,
    }),
    getDevelopers(),
    getTags(),
  ]);

  const initialData =
    postsResult.status === 'fulfilled'
      ? postsResult.value
      : {
          content: [],
          page: 0,
          size: 20,
          totalElements: 0,
          totalPages: 0,
          last: true,
        };

  const developers =
    developersResult.status === 'fulfilled' ? developersResult.value : [];

  const tags = tagsResult.status === 'fulfilled' ? tagsResult.value : [];

  return (
    <HomeContainer
      initialData={initialData}
      developers={developers}
      tags={tags}
      searchParams={searchParams}
    />
  );
}
