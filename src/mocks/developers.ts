import { User } from '@/types/blog';

interface Developer extends User {
  role: string;
}

export const mockDevelopers: Developer[] = [
  {
    id: '1',
    username: '한창희',
    role: 'Frontend Developer',
  },
  {
    id: '2',
    username: '이찬호',
    role: 'Frontend Developer',
  },
  {
    id: '3',
    username: '송규섭',
    role: 'Frontend Developer',
  },

  {
    id: '4',
    username: '최영민',
    role: 'Frontend Developer',
  },
  {
    id: '5',
    username: '문광운',
    role: 'UI UX Designer',
  },
];
