import { Post, Tag, PostStatus, User } from '@/types/blog';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Next.js 14로 블로그 만들기',
    summary:
      'Next.js 14의 새로운 기능들을 활용하여 블로그를 만드는 방법을 알아봅니다.',
    content: '...',
    thumbnail:
      'https://api.dicebear.com/7.x/shapes/svg?seed=post1&backgroundColor=0a0a0a',
    status: PostStatus.PUBLISHED,
    publishedAt: '2024-02-20',
    createdAt: '2024-02-20T00:00:00.000Z',
    updatedAt: '2024-02-20T00:00:00.000Z',
    user: {
      id: '1',
      username: '리자노',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=리자노',
    },
    tags: [
      { id: '1', name: 'Next.js' },
      { id: '2', name: 'React' },
      { id: '3', name: 'TypeScript' },
    ],
    viewCount: 100,
  },
  {
    id: '2',
    title: 'UI/UX 디자인과 개발자 협업에 중요한 기초 상식',
    summary: '팀 프로젝트를 위한 기초적인 상식에 대해 알아봅시다!',
    content: '...',
    thumbnail:
      'https://api.dicebear.com/7.x/shapes/svg?seed=post2&backgroundColor=0a0a0a',
    status: PostStatus.PUBLISHED,
    publishedAt: '2024-02-15',
    createdAt: '2024-02-15T00:00:00.000Z',
    updatedAt: '2024-02-15T00:00:00.000Z',
    user: {
      id: '2',
      username: '문광운',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=문광운',
    },
    tags: [
      { id: '4', name: 'Development' },
      { id: '5', name: 'Design' },
      { id: '6', name: 'Project' },
    ],
    viewCount: 150,
  },
  {
    id: '3',
    title: 'Mohaji 팀원들의 포스팅이 있을 예정입니다.',
    summary: '기술 개발에 대한 다양한 포스팅이 예정되어있어요.',
    content: '...',
    thumbnail:
      'https://api.dicebear.com/7.x/shapes/svg?seed=post3&backgroundColor=0a0a0a',
    status: PostStatus.PUBLISHED,
    publishedAt: '2024-02-10',
    createdAt: '2024-02-10T00:00:00.000Z',
    updatedAt: '2024-02-10T00:00:00.000Z',
    user: {
      id: '3',
      username: '이찬호',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=이찬호',
    },
    tags: [
      { id: '7', name: 'Development' },
      { id: '8', name: 'Project' },
    ],
    viewCount: 80,
  },
  // ... 더 많은 목업 데이터
];

export const mockPostDetail: Post = {
  id: '1',
  user: {
    id: 'user1',
    username: '송규섭',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=송규원',
  },
  title: 'UI/UX 디자이너과 개발자 협업에 중요한 기초 상식',
  summary:
    'UI/UX 디자이너와 개발자가 협업하는 과정에서 알아야 할 중요한 기초 지식들을 정리했습니다.',
  content: `
<h1>UI/UX 개발 협업</h1>
<p>디자이너와 개발자의 원활한 협업을 위해서는 서로의 영역에 대한 이해가 필요합니다.</p>

<h2>기획에서의 협업</h2>
<p>프로젝트 초기 단계에서 기획자, 디자이너, 개발자가 모여 프로젝트의 방향성을 정립합니다.</p>

<h2>디자인에서의 협업</h2>
<p>디자이너가 제시한 디자인을 개발자가 구현하는 과정에서 발생할 수 있는 기술적 제약사항들을 고려해야 합니다.</p>

<h3>의사소통 팁</h3>
<p>서로의 전문 용어를 이해하고, 명확한 의사소통을 하는 것이 중요합니다.</p>

<h2>지속적인 수정 과정</h2>
<p>디자인과 개발은 반복적인 수정과 보완을 통해 완성도를 높여갑니다.</p>

<h3>문제점 파악</h3>
<p>발생하는 문제들을 빠르게 파악하고 해결방안을 모색합니다.</p>

<h3>다양한 피드백 수용</h3>
<p>다양한 관점에서의 피드백을 수용하여 더 나은 결과물을 만들어냅니다.</p>

<h1>UI/UX 개발 협업</h1>
<p>디자이너와 개발자의 원활한 협업을 위해서는 서로의 영역에 대한 이해가 필요합니다.</p>

<h2>기획에서의 협업</h2>
<p>프로젝트 초기 단계에서 기획자, 디자이너, 개발자가 모여 프로젝트의 방향성을 정립합니다.</p>

<h2>디자인에서의 협업</h2>
<p>디자이너가 제시한 디자인을 개발자가 구현하는 과정에서 발생할 수 있는 기술적 제약사항들을 고려해야 합니다.</p>

<h3>의사소통 팁</h3>
<p>서로의 전문 용어를 이해하고, 명확한 의사소통을 하는 것이 중요합니다.</p>

<h2>지속적인 수정 과정</h2>
<p>디자인과 개발은 반복적인 수정과 보완을 통해 완성도를 높여갑니다.</p>

<h3>문제점 파악</h3>
<p>발생하는 문제들을 빠르게 파악하고 해결방안을 모색합니다.</p>

<h3>다양한 피드백 수용</h3>
<p>다양한 관점에서의 피드백을 수용하여 더 나은 결과물을 만들어냅니다.</p>
`.trim(),
  thumbnail:
    'https://api.dicebear.com/7.x/shapes/svg?seed=post1&backgroundColor=0a0a0a',
  status: PostStatus.PUBLISHED,
  publishedAt: '2024-01-20T14:14:51.054Z',
  createdAt: '2024-01-20T14:14:51.054Z',
  updatedAt: '2024-01-20T14:14:51.054Z',
  tags: [
    { id: '1', name: 'Development' },
    { id: '2', name: 'Project' },
    { id: '3', name: 'Tech' },
    { id: '4', name: 'Design' },
  ],
  viewCount: 1234,
};
