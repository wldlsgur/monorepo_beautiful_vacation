import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MUTATE_OPTION, QUERY_KEY } from '@/shared/constant';
import { Button } from '@/shared/ui';

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(MUTATE_OPTION.LOGOUT());

  const handleLogout = async () => {
    mutate(undefined, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.AUTH }),
    });
  };

  return <Button onClick={handleLogout}>로그아웃</Button>;
};

export default LogoutButton;
