// src/components/editor/MarkdownPreview.tsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownPreviewProps {
  content: string;
  title: string;
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

export default function MarkdownPreview({
  content,
  title,
}: MarkdownPreviewProps) {
  return (
    <div className="h-full bg-surface1 overflow-y-auto px-8 py-6">
      <h1 className="text-[30px] font-bold mb-8 text-black">
        {title || '제목 없음'}
      </h1>
      <div className="prose prose-neutral max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          breaks={true}
          components={{
            code({ node, inline, className, children, ...props }) {
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
                    <span className="language-label">
                      {language.toUpperCase()}
                    </span>
                  </div>
                  <div className="code-block-content">
                    <SyntaxHighlighter
                      language={language}
                      style={customTheme}
                      customStyle={{
                        margin: 0,
                        background: '#FFFFFF',
                        padding: '1rem',
                        fontSize: '14px',
                        fontFamily: 'Pretendard',
                      }}
                      PreTag="div"
                      wrapLines={true}
                      wrapLongLines={true}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            },
            // 링크 스타일
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-[#FF8C42] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            // 헤딩 스타일
            h1: ({ children }) => (
              <h1 className="text-[30px] font-bold text-black mt-8 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-[24px] font-bold text-black mt-6 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-[20px] font-bold text-black mt-5 mb-3">
                {children}
              </h3>
            ),
            // 단락 스타일 - 줄바꿈 처리 추가
            p: ({ children }) => (
              <p className="text-[16px] leading-7 text-[#4D4D4D] mb-4 whitespace-pre-line">
                {children}
              </p>
            ),
            // 목록 스타일
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-1 my-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-1 my-4">
                {children}
              </ol>
            ),
            // 인용구 스타일
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#FF8C42] bg-[#F9F9F9] px-4 py-3 my-4 text-[#666666]">
                {children}
              </blockquote>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      <style jsx global>{`
        .code-block-wrapper {
          margin: 1.5em 0;
          background: #ffffff;
          border: 1px solid #e4e6eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .code-block-header {
          position: relative;
          height: 32px;
          background: #f9f9f9;
          display: flex;
          align-items: center;
          padding: 0 12px;
          border-bottom: 1px solid #e4e6eb;
        }

        .mac-buttons {
          display: flex;
          gap: 8px;
        }

        .mac-button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .mac-button.close {
          background-color: #ff5f56;
        }

        .mac-button.minimize {
          background-color: #ffbd2e;
        }

        .mac-button.maximize {
          background-color: #27c93f;
        }

        .language-label {
          /* 중앙 정렬 스타일 제거 */
          position: absolute;
          left: auto; /* left: 50% 제거 */
          right: 12px; /* 우측 끝에서 12px 간격 */
          transform: translateY(-50%); /* X축 변환 제거, Y축만 유지 */
          top: 50%;
          font-size: 12px;
          color: #666666;
          font-weight: 500;
        }

        /* prose 스타일 재정의 */
        .prose {
          max-width: none;
        }

        .prose pre {
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
        }

        .prose img {
          border-radius: 8px;
          margin: 24px 0;
        }

        .prose hr {
          border-color: #e4e6eb;
          margin: 24px 0;
        }

        /* 코드 블록 내부 스타일 */
        .code-block-content {
          background: #ffffff;
          overflow-x: auto;
        }

        .code-block-content > div {
          background: #ffffff !important;
        }

        .code-block-content code {
          background: none !important;
        }

        .code-block-content span {
          background: none !important;
        }

        /* 인라인 코드 스타일 */
        :not(pre) > code {
          background-color: #f2f3f5 !important;
          color: #666666 !important;
          padding: 0.2em 0.4em !important;
          border-radius: 4px !important;
          font-size: 14px !important;
          font-family: Pretendard !important;
        }
      `}</style>
    </div>
  );
}
