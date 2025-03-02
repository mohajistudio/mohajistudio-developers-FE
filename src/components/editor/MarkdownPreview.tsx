'use client';

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';
import { TocItem } from '@/types/blog';
import { MarkdownPreviewStyles } from './MarkdownPreviewStyles';

interface MarkdownPreviewProps {
  content: string;
  isPreview?: boolean; // 프리뷰 모드인지 여부
  title?: string; // 프리뷰일 때만 사용
  tocItems?: TocItem[]; // TOC 아이템 목록
}

// 커스텀 테마 설정
const customTheme = {
  ...oneLight,
  'pre[class*="language-"]': {
    ...oneLight['pre[class*="language-"]'],
    background: 'white',
    margin: 0,
    padding: 0,
  },
  'code[class*="language-"]': {
    ...oneLight['code[class*="language-"]'],
    background: 'white',
  },
  token: {
    ...oneLight['token'],
    background: 'none',
  },
  'token.keyword': { ...oneLight['token.keyword'], background: 'none' },
  'token.string': { ...oneLight['token.string'], background: 'none' },
  'token.function': { ...oneLight['token.function'], background: 'none' },
  'token.number': { ...oneLight['token.number'], background: 'none' },
  'token.operator': { ...oneLight['token.operator'], background: 'none' },
  'token.constant': { ...oneLight['token.constant'], background: 'none' },
};

const MarkdownPreview = ({
  content,
  isPreview = false,
  title,
  tocItems = [],
}: MarkdownPreviewProps) => {
  // 디버깅을 위한 로그
  useEffect(() => {
    // console.log('MarkdownPreview 마운트, tocItems:', tocItems);

    // 마운트 후 잠시 대기 후 헤딩 ID 확인 (렌더링 완료 후)
    setTimeout(() => {
      const headings = document.querySelectorAll('h1, h2, h3');
      // console.log('렌더링된 헤딩 요소 수:', headings.length);
      // console.log('헤딩 요소:');
      headings.forEach((h) => {
        // console.log(
        //   `${h.tagName}: id="${h.id}", text="${h.textContent?.trim()}"`,
        // );
      });

      // TOC에서 사용하는 ID를 가진 요소가 있는지 확인
      if (tocItems.length > 0) {
        // console.log('TOC 항목에 대응하는 헤딩 요소 확인:');
        tocItems.forEach((item) => {
          const element = document.getElementById(item.id);
          // console.log(
          //   `TOC ID "${item.id}" (${item.text}): ${element ? '요소 찾음' : '요소 없음'}`,
          // );
        });
      }
    }, 500);
  }, [tocItems]);

  // CodeComponent를 위한 정의 (이전과 동일)
  const CodeComponent = ({
    node,
    inline,
    className,
    children,
    ...props
  }: any) => {
    const match = /language-(\w+)/.exec(className || '');

    if (inline) {
      return (
        <code
          className="bg-[#F2F3F5] text-[#666666] px-2 py-1 rounded text-[14px] font-normal"
          {...props}
        >
          {children}
        </code>
      );
    }

    const language = match ? match[1] : '';

    return (
      <div className="code-block-wrapper">
        <div className="code-block-header">
          <div className="mac-buttons">
            <span className="mac-button close"></span>
            <span className="mac-button minimize"></span>
            <span className="mac-button maximize"></span>
          </div>
          <span className="language-label">{language.toUpperCase()}</span>
        </div>
        <div className="code-block-content">
          {/* @ts-ignore */}
          <SyntaxHighlighter
            language={language}
            style={customTheme}
            customStyle={{
              margin: 0,
              background: '#FFFFFF',
              padding: '1rem',
              fontSize: '14px',
              fontFamily: 'Pretendard',
              tabSize: 2,
              lineHeight: '1.5',
            }}
            PreTag="div"
            wrapLines={true}
            wrapLongLines={true}
            showLineNumbers={true}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  };

  // 헤딩 처리를 위한 함수 - TOC 항목의 ID를 그대로 사용
  const createHeadingComponent = (level: number) => {
    const HeadingComponent = ({ node, children, ...props }: any) => {
      // 헤딩 텍스트 얻기
      const text = String(children).replace(/\s+/g, ' ').trim();

      // 해당 텍스트를 가진 TOC 항목 찾기
      const matchingTocItem = tocItems.find(
        (item) => item.level === level && item.text === text,
      );

      // TOC에 있는 항목인 경우 해당 ID 사용, 없으면 자체 ID 생성
      const id = matchingTocItem
        ? matchingTocItem.id
        : `heading-auto-${level}-${text.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}`;

      // console.log(`헤딩 렌더링: level=${level}, text="${text}", id="${id}"`);

      let className;
      if (level === 1) {
        className = 'text-[30px] font-bold text-black mt-8 mb-4';
      } else if (level === 2) {
        className = 'text-[24px] font-bold text-black mt-6 mb-4';
      } else if (level === 3) {
        className = 'text-[20px] font-bold text-black mt-5 mb-3';
      }

      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

      return (
        <HeadingTag id={id} className={className} {...props}>
          {children}
        </HeadingTag>
      );
    };

    HeadingComponent.displayName = `Heading${level}`;

    return HeadingComponent;
  };

  const components: Components = {
    code: CodeComponent,
    a: ({ node, children, href, ...props }) => (
      <a
        href={href}
        className="text-[#FF8C42] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    h1: createHeadingComponent(1),
    h2: createHeadingComponent(2),
    h3: createHeadingComponent(3),
    p: ({ node, children, ...props }) => (
      <p
        className="text-[16px] leading-7 text-[#4D4D4D] mb-4 whitespace-pre-line"
        {...props}
      >
        {children}
      </p>
    ),
    ul: ({ node, children, ...props }) => (
      <ul className="list-disc list-inside space-y-1 my-4" {...props}>
        {children}
      </ul>
    ),
    ol: ({ node, children, ...props }) => (
      <ol className="list-decimal list-inside space-y-1 my-4" {...props}>
        {children}
      </ol>
    ),
    blockquote: ({ node, children, ...props }) => (
      <blockquote
        className="border-l-4 border-[#FF8C42] bg-[#F9F9F9] px-4 py-3 my-4 text-[#666666]"
        {...props}
      >
        {children}
      </blockquote>
    ),
  };

  return (
    <div
      className={`h-full overflow-y-auto px-8 py-6 ${isPreview ? 'bg-[#FCFCFC]' : 'bg-white'}`}
    >
      {/* 프리뷰 모드일 때만 제목 표시 */}
      {isPreview && (
        <h1 className="text-[30px] font-bold mb-8 text-black">
          {title || '제목 없음'}
        </h1>
      )}
      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>

      <MarkdownPreviewStyles />
    </div>
  );
};

export default MarkdownPreview;
