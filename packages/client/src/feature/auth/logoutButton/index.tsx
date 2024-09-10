import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MUTATE_OPTION } from '@/shared/constant';
import { Button } from '@/shared/ui';

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(MUTATE_OPTION.LOGOUT({ queryClient }));

  return <Button onClick={() => mutate()}>로그아웃</Button>;
};

export default LogoutButton;
