import { TocItem } from '@/types/blog';

export function generateTocFromContent(content: string): TocItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3');

  return Array.from(headings).map((heading, index) => ({
    id: `heading-${index}`,
    text: heading.textContent || '',
    level: parseInt(heading.tagName[1]),
  }));
}
