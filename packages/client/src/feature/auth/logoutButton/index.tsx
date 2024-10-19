import { usePostLogout } from '@/entities/auth';
import { Button } from '@/shared/ui';

const LogoutButton = () => {
  const { mutate } = usePostLogout();

  return <Button onClick={() => mutate()}>로그아웃</Button>;
};

export default LogoutButton;
