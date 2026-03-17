// hooks
import useAuth from '@/hooks/use-auth';
// hooks-query
import { useGetUser } from '@/hooks/use-query-user';
// utils
import createAvatar from '@/utils/create-avatar';
//
import Avatar, { type Props as AvatarProps } from '@/components/avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  const { user } = useAuth();
  const { data: userProfile } = useGetUser(user?.username);

  const displayName = userProfile
    ? `${userProfile.firstName} ${userProfile.lastName}`
    : `${user?.firstName} ${user?.lastName}`;

  return (
    <Avatar
      src={userProfile?.thumbnailAvatarUrl}
      alt={displayName}
      color={userProfile?.thumbnailAvatarUrl ? 'default' : createAvatar(displayName).color}
      {...other}
    >
      {displayName && createAvatar(displayName).name}
    </Avatar>
  );
}
