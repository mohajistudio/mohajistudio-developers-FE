'use client';

import { useRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface MarkdownEditorProps {
  onChangeContent: (content: string) => void;
}

export default function MarkdownEditor({
  onChangeContent,
}: MarkdownEditorProps) {
  const editorRef = useRef<Editor>(null);

  // 컴포넌트 마운트 시 에디터 초기화
  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(''); // 초기 마크다운 내용을 빈 문자열로 설정
      editorInstance.reset(); // 에디터 리셋
    }
  }, []);

  return (
    <div className="h-full">
      <Editor
        ref={editorRef}
        initialValue=""
        initialEditType="markdown"
        placeholder="당신의 이야기를 적어보세요..."
        height="100%"
        hideModeSwitch={true}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
        onChange={() => {
          const content = editorRef.current?.getInstance().getMarkdown();
          onChangeContent(content || '');
        }}
      />

      <style jsx global>{`
        /* Write/Preview 탭 숨기기 */
        .toastui-editor-mode-switch {
          display: none !important;
        }

        /* 탭 컨테이너 숨기기 */
        .toastui-editor-md-tab-container {
          display: none !important;
        }

        /* Write/Preview 텍스트 숨기기 */
        .toastui-editor-tabs {
          display: none !important;
        }

        /* Preview 영역 숨기기 */
        .toastui-editor-md-preview {
          display: none !important;
        }

        /* 에디터 기본 스타일 */
        .toastui-editor-defaultUI {
          border: none !important;
        }

        .toastui-editor-toolbar {
          border-bottom: 1px solid #e4e6eb !important;
          padding: 8px !important;
        }

        .toastui-editor-md-container {
          background-color: #ffffff !important;
        }

        .toastui-editor-md-container .toastui-editor {
          background-color: #ffffff !important;
          padding: 24px !important;
        }

        .toastui-editor-contents {
          font-size: 16px !important;
          font-family:
            Pretendard,
            -apple-system,
            BlinkMacSystemFont,
            system-ui,
            sans-serif !important;
        }

        /* 에디터 내 코드 블록 관련 스타일 제거 */
        .toastui-editor-contents pre {
          background: none !important;
          padding: 0 !important;
        }

        /* 인라인 코드 스타일 */
        .toastui-editor-contents code {
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
