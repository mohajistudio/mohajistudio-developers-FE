import Link from 'next/link';
import Image from 'next/image';
import ProfileImage from './ProfileImage';

interface DeveloperCardProps {
  nickname: string;
  role: string;
  jobRole?: string | null;
  profileImage?: string;
}

export default function DeveloperCard({
  nickname,
  role,
  jobRole,
  profileImage,
}: DeveloperCardProps) {
  // console.log(
  //   `DeveloperCard - nickname: ${nickname}, role: ${role}, jobRole: ${jobRole}`,
  // );

  const displayRole =
    role && role.includes('ROLE_DEVELOPER') ? jobRole || 'Developer' : role;

  return (
    <Link
      href={`/developers/${nickname}`}
      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
    >
      {profileImage ? (
        <Image
          src={profileImage}
          alt={nickname}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      ) : (
        <ProfileImage nickname={nickname} />
      )}
      <div>
        <h3 className="font-medium text-base text-[#000000]">{nickname}</h3>
        <p className="text-base text-[#999999]">{displayRole}</p>
      </div>
    </Link>
  );
}
