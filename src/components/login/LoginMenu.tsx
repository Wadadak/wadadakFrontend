import { faBell, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import AvatarWithDropdown from '../common/AvatarWithDropdown';
import { useLoginUser } from '@/hooks/user/useLoginUser';
import Button from '../common/Button';

const LoginMenu = () => {
  const router = useRouter();
  const { loginUser } = useLoginUser();

  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-3">
        <Button
          size="sm"
          color="accent"
          onClick={() => router.push('/joined-crews')}
        >
          마이 크루
        </Button>
        <Button
          size="sm"
          color="accent"
          outline
          onClick={() => router.push('/create-crew')}
        >
          크루 만들기
        </Button>
      </div>

      {/* <HeaderMenu
        name={'마이 크루'}
        icon={faBell}
        onMenuClick={() => router.push('/joined-crews')}
      />
      <HeaderMenu
        name={'크루 만들기'}
        icon={faBell}
        onMenuClick={() => router.push('/create-crew')}
      /> */}
      {/* <HeaderMenu
        name={'메시지'}
        icon={faBell}
        onMenuClick={() => router.push('/message')}
      />
      <HeaderMenu
        name={'알림'}
        icon={faBell}
        onMenuClick={() => router.push('/alarm')}
      /> */}
      <AvatarWithDropdown src={loginUser?.profileImage} />
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
