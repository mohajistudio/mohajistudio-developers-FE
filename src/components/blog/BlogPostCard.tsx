import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/blog';
import { formatDate } from '@/utils/date';

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* 썸네일 이미지 */}
      {post.thumbnail && (
        <div className="relative w-full h-[400px]">
          <Image
            src={post.thumbnail}
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
        <Link href={`/posts/${post.id}`}>
          <h2 className="text-2xl font-bold mb-2 hover:text-[#FF8C42] transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* 날짜 */}
        <time className="block text-[#666666] mb-4">
          {formatDate(post.publishedAt)}
        </time>

        {/* 요약 */}
        <p className="text-[#4D4D4D] mb-6">{post.summary}</p>

        {/* 태그 목록 */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-4 py-2 bg-[#F2F3F5] text-[#666666] rounded-full text-sm"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
