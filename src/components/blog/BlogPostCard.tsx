import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/blog';
import { formatDate } from '@/utils/date';

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  // 첫 번째 이미지 URL 추출하는 함수
  const extractFirstImageUrl = (markdown: string) => {
    const match = markdown.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
  };

  // summary에서 첫 번째 이미지 URL 추출
  const firstImageUrl = post.summary
    ? extractFirstImageUrl(post.summary)
    : null;

  return (
    <Link href={`/posts/${post.id}`}>
      <article className="bg-white rounded-2xl overflow-hidden shadow-[0px_0px_8px_0px_rgba(0,0,0,0.02)] hover:bg-[#F7F8FA] transition-colors">
        {/* 썸네일 이미지가 있을 때만 렌더링 */}
        {(firstImageUrl || post.thumbnail) &&
          typeof (firstImageUrl || post.thumbnail) === 'string' && (
            <div className="relative w-full h-[400px]">
              <Image
                src={firstImageUrl || post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

        {/* 컨텐츠 영역 */}
        <div className="p-8">
          {/* 제목 */}
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>

          {/* 날짜 */}
          <time className="block text-[#666666] mb-4">
            {post.publishedAt
              ? formatDate(post.publishedAt)
              : formatDate(post.createdAt)}
          </time>

          {/* 요약 - 이미지 마크다운을 제외한 텍스트만 표시 */}
          {post.summary && (
            <p className="text-[#4D4D4D] mb-6">
              {post.summary.replace(/!\[.*?\]\(.*?\)/g, '').trim()}
            </p>
          )}

          {/* 태그 목록 */}
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag.id}
                className="px-4 py-2 bg-[#E4E6EB] text-[#666666] rounded-full text-sm"
              >
                {tag.title}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
