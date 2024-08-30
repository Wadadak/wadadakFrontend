import { faBell, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../common/Avatar';
import { useRouter } from 'next/navigation';
import { mockMyInfo } from '@/mocks/mockData/mockMyInfo';

const LoginMenu = () => {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-6">
      <HeaderMenu
        name={'마이 크루'}
        icon={faBell}
        onMenuClick={() => router.push('/my-crews')}
      />
      <HeaderMenu
        name={'메시지'}
        icon={faBell}
        onMenuClick={() => router.push('/message')}
      />
      <HeaderMenu
        name={'알림'}
        icon={faBell}
        onMenuClick={() => router.push('/alarm')}
      />
      <Avatar
        src={mockMyInfo.profileImage}
        onAvatarClick={() => router.push('/my')}
      />
    </div>
  );
};

export default LoginMenu;
interface HeaderMenuProps {
  name: string;
  icon: IconDefinition;
  onMenuClick: () => void;
}

const HeaderMenu = ({ name, icon, onMenuClick }: HeaderMenuProps) => {
  return (
    <button
      className="flex flex-col items-center space-y-2"
      onClick={onMenuClick}
    >
      <FontAwesomeIcon icon={icon} className="w-5 h-5" />
      <div className="text-[10px]">{name}</div>
    </button>
  );
};
