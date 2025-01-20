// src/components/editor/WriteHeader.tsx
interface WriteHeaderProps {
  title: string;
  tags: string[];
  tagInput: string;
  onChangeTitle: (title: string) => void;
  onChangeTagInput: (value: string) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export default function WriteHeader({
  title,
  tags,
  tagInput,
  onChangeTitle,
  onChangeTagInput,
  onAddTag,
  onRemoveTag,
}: WriteHeaderProps) {
  // onChange 이벤트 핸들러
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 콤마가 입력된 경우
    if (value.includes(',')) {
      // 콤마 이전의 값만 태그로 등록
      const newTag = value.split(',')[0].trim();
      if (newTag && !tags.includes(newTag)) {
        onAddTag(newTag);
      }
      // 입력창 비우기
      onChangeTagInput('');
    } else {
      // 일반적인 입력의 경우
      onChangeTagInput(value);
    }
  };

  // keyDown 이벤트 핸들러
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter 키 입력 시
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 동작 방지

      // 한글 입력 중이 아닐 때만 처리
      if (!e.nativeEvent.isComposing) {
        const newTag = tagInput.trim();
        if (newTag && !tags.includes(newTag)) {
          onAddTag(newTag);
          onChangeTagInput('');
        }
      }
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full text-2xl bg-transparent border-none focus:outline-none text-primary placeholder-gray-400 mb-4"
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full bg-[#FF8C42] text-white text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="ml-1.5 hover:text-gray-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagInputKeyDown}
          placeholder="태그를 입력하세요"
          className="bg-transparent border-none focus:ring-0 text-sm placeholder-gray-400"
        />
      </div>
    </div>
  );
}
