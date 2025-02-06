import { Tag } from '@/types/blog';

// 태그 사용 횟수를 추적하기 위한 확장 인터페이스
interface TagWithCount extends Tag {
  count: number;
}

export const mockTags: TagWithCount[] = [
  {
    id: '1',
    name: 'Next.js',
    count: 15,
  },
  {
    id: '2',
    name: 'React',
    count: 25,
  },
  {
    id: '3',
    name: 'JavaScript',
    count: 20,
  },
  {
    id: '4',
    name: 'TypeScript',
    count: 18,
  },
  {
    id: '5',
    name: 'Node.js',
    count: 12,
  },
  {
    id: '6',
    name: 'Express',
    count: 10,
  },
  {
    id: '7',
    name: 'MongoDB',
    count: 8,
  },
  // ... 더 많은 태그 데이터
];
