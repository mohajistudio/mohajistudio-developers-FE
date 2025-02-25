import { TocItem } from '@/types/blog';

/**
 * 마크다운 텍스트를 정규화하는 함수
 */
export const normalizeMarkdown = (content: string): string => {
  if (!content) return '';

  // 1. 코드블록 보호
  const codeBlocks: string[] = [];
  let normalized = content.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // 2. 헤딩과 일반 텍스트 처리
  normalized = normalized
    // 헤딩 사이 줄바꿈
    .replace(/(#{1,6}\s+[^#\n]+)(?=\s+#|$)/g, '$1\n\n')
    // 일반 텍스트 문단 처리
    .replace(/([^.!?]+[.!?])\s+(?=[A-Z가-힣])/g, '$1\n\n');

  // 3. 코드블록 복원
  codeBlocks.forEach((block, index) => {
    const formattedBlock = block
      .replace(/```(\w+)\s+/, '```$1\n') // 언어 지정 후 줄바꿈
      .replace(/\s+```$/, '\n```'); // 코드블록 끝 줄바꿈

    normalized = normalized.replace(
      `__CODE_BLOCK_${index}__`,
      `\n\n${formattedBlock}\n\n`,
    );
  });

  // 4. 최종 정리
  return normalized
    .replace(/\n{3,}/g, '\n\n') // 연속된 줄바꿈 정리
    .trim();
};

/**
 * 텍스트를 URL-friendly한 슬러그로 변환하는 함수
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // 공백을 하이픈으로 변환
    .replace(/[^\w\-]+/g, '') // 알파벳, 숫자, 하이픈이 아닌 문자 제거
    .replace(/\-\-+/g, '-') // 연속된 하이픈을 하나로 합침
    .replace(/^-+/, '') // 앞쪽 하이픈 제거
    .replace(/-+$/, ''); // 뒤쪽 하이픈 제거
};

/**
 * 마크다운에서 목차 아이템을 추출하는 향상된 함수
 */
export const extractTocItems = (content: string) => {
  // 헤딩을 추출하는 정규식 (# 헤딩, ## 헤딩, ### 헤딩 형식으로 추출)
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const items = [];
  let match;

  // 모든 헤딩을 찾아 목차 항목으로 변환
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // #의 개수
    const text = match[2].trim();

    // 고유한 ID 생성 - ID 형식을 일관되게 유지 (기존 코드와 호환)
    const id = `heading-${items.length}`;

    items.push({
      id,
      text,
      level,
    });
  }

  return items;
};

/**
 * TOC ID를 마크다운 텍스트에 삽입하는 함수
 * 추출된 목차 항목에 맞게 마크다운의 헤딩에 ID를 추가
 */
export const insertTocIdsToMarkdown = (
  markdownText: string,
  tocItems: TocItem[],
): string => {
  let result = markdownText;
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  let index = 0;

  // 마크다운의 각 헤딩을 찾아 ID 속성을 추가
  result = result.replace(headingRegex, (match, hashes, content) => {
    if (index < tocItems.length) {
      const tocItem = tocItems[index++];
      // 마크다운 헤딩에 ID 추가 (HTML 속성 형태로)
      return `${hashes} ${content} {#${tocItem.id}}`;
    }
    return match;
  });

  return result;
};
