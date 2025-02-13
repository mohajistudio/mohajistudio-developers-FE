interface ProfileImageProps {
  nickname?: string;
  size?: number;
}

export default function ProfileImage({
  nickname = 'Anonymous',
  size = 40,
}: ProfileImageProps) {
  const colorMap = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];

  // 사용자 이름을 기반으로 일관된 색상 선택
  const colorIndex =
    nickname.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colorMap.length;

  return (
    <div
      className={`relative rounded-full overflow-hidden ${colorMap[colorIndex]}`}
      style={{ width: size, height: size }}
    >
      {/* 프로필 이미지가 있는 경우 */}
      <div className="flex items-center justify-center w-full h-full text-white font-bold">
        {nickname.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}
