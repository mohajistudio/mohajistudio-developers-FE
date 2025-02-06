interface ProfileImageProps {
  username: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const colorMap = [
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-purple-100 text-purple-600',
  'bg-yellow-100 text-yellow-600',
  'bg-pink-100 text-pink-600',
];

export default function ProfileImage({
  username,
  size = 'md',
}: ProfileImageProps) {
  // 사용자 이름을 기반으로 일관된 색상 선택
  const colorIndex =
    username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colorMap.length;

  return (
    <div
      className={`${sizeMap[size]} rounded-full flex items-center justify-center font-medium ${colorMap[colorIndex]}`}
    >
      {username[0].toUpperCase()}
    </div>
  );
}
