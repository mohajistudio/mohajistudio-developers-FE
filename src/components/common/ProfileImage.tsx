import Image from 'next/image';

interface ProfileImageProps {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
}

export default function ProfileImage({
  src,
  alt = '프로필',
  size = 32,
  className = '',
}: ProfileImageProps) {
  return (
    <div className={`relative group ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <Image
          src="/icon/Profile_Default_img@2x.svg"
          alt={alt}
          width={size}
          height={size}
          className="w-full h-full object-cover rounded-full"
        />
      )}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-200 rounded-full" />
    </div>
  );
}
