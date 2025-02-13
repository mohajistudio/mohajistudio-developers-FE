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
 * 마크다운에서 목차 아이템을 추출하는 함수
 */
export const extractTocItems = (content: string) => {
  const headings = content.match(/#{1,6}\s+[^\n]+/g) || [];

  return headings.map((heading, index) => {
    const level = (heading.match(/^#+/) || [''])[0].length;
    const text = heading.replace(/^#+\s+/, '').trim();

    return {
      id: `heading-${index}`,
      text,
      level,
    };
  });
};
