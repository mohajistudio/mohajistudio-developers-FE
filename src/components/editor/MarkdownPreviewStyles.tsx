export const MarkdownPreviewStyles = () => (
  <style jsx global>{`
    /* 코드 블록 스타일 */
    .code-block-wrapper {
      margin: 1.5em 0;
      background: #fcfcfc;
      border: 1px solid #e4e6eb;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
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
      position: absolute;
      left: auto;
      right: 12px;
      transform: translateY(-50%);
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
      background: #fcfcfc;
      overflow-x: auto;
      max-width: 790px;
    }

    .code-block-content > div {
      background: #fcfcfc !important;
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

    /* 코드 블록 들여쓰기 관련 스타일 추가 */
    .code-block-content pre {
      tab-size: 2 !important;
      -moz-tab-size: 2 !important;
      -o-tab-size: 2 !important;
      -webkit-tab-size: 2 !important;
      width: max-content;
      min-width: 100%;
    }

    .code-block-content code {
      font-family: 'Pretendard Mono', Consolas, Monaco, monospace !important;
      white-space: pre !important;
      word-spacing: normal !important;
      word-break: normal !important;
      word-wrap: normal !important;
      line-height: 1.5 !important;
    }

    /* 라인 넘버 스타일 */
    .linenumber {
      min-width: 2.5em !important;
      padding-right: 1em !important;
      text-align: right !important;
      color: #999999 !important;
      user-select: none !important;
    }

    /* 스크롤바 커스텀 스타일링 */
    .code-block-content::-webkit-scrollbar {
      height: 6px;
    }

    .code-block-content::-webkit-scrollbar-track {
      background: #f2f3f5;
      border-radius: 3px;
    }

    .code-block-content::-webkit-scrollbar-thumb {
      background: #e4e6eb;
      border-radius: 3px;
      transition: background-color 0.2s ease;
    }

    .code-block-content::-webkit-scrollbar-thumb:hover {
      background: #999999;
    }
  `}</style>
);
