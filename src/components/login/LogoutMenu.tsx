import { useRouter } from 'next/navigation';
import Button from '../common/Button';

const LogoutMenu = () => {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-3">
      <Button size="sm" onClick={() => router.push('/login')}>
        로그인
      </Button>
      <Button size="sm" color="accent" onClick={() => router.push('/signup')}>
        회원가입
      </Button>
    </div>
  );
};
export default LogoutMenu;
