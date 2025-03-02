import { useRef, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { uploadMediaFiles } from '@/apis/posts';
import { MarkdownEditorStyles } from './MarkdownEditorStyles';

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

      // 이미지 업로드 핸들러 등록
      editorInstance.addHook(
        'addImageBlobHook',
        async (
          blob: File,
          callback: (url: string, altText: string) => void,
        ) => {
          try {
            // 업로드 중임을 표시
            const uploadingText = `![Uploading ${blob.name}...]()`;
            editorInstance.insertText(uploadingText);

            // 이미지 업로드 API 호출
            const [uploadedFile] = await uploadMediaFiles([blob]);
            const imageUrl = `https://mohajistudio-developers.s3.ap-northeast-2.amazonaws.com/${uploadedFile.fileName}`;

            // 업로드 중 텍스트 제거 (이미지는 callback으로만 삽입)
            const currentContent = editorInstance.getMarkdown();
            const updatedContent = currentContent.replace(uploadingText, '');
            editorInstance.setMarkdown(updatedContent);

            // Toast UI Editor callback으로 이미지 삽입
            callback(imageUrl, blob.name);
          } catch (error) {
            console.error('이미지 업로드 실패:', error);

            // 에러 발생 시 업로드 중 텍스트 제거
            const currentContent = editorInstance.getMarkdown();
            const updatedContent = currentContent.replace(
              `![Uploading ${blob.name}...]()`,
              '',
            );
            editorInstance.setMarkdown(updatedContent);

            // 사용자에게 에러 메시지 표시
            alert(
              error instanceof Error
                ? error.message
                : '이미지 업로드에 실패했습니다.',
            );
          }

          return false; // 기본 동작 방지
        },
      );

      editorInstance.setMarkdown(''); // 초기 마크다운 내용을 빈 문자열로 설정
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

      <MarkdownEditorStyles />
    </div>
  );
}
