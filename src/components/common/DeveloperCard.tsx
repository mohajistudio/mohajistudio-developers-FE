import Link from 'next/link';
import ProfileImage from './ProfileImage';

interface DeveloperCardProps {
  username: string;
  role: string;
  profileImage?: string;
}

export default function DeveloperCard({
  username,
  role,
  profileImage,
}: DeveloperCardProps) {
  return (
    <Link
      href={`/developers/${username}`}
      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
    >
      {profileImage ? (
        <img
          src={profileImage}
          alt={username}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <ProfileImage username={username} />
      )}
      <div>
        <h3 className="font-medium text-base text-[#000000]">{username}</h3>
        <p className="text-base text-[#999999]">{role}</p>
      </div>
    </Link>
  );
}
