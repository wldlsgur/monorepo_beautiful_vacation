import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserResponse } from 'common-types';
import { MUTATE_OPTION, QUERY_KEY, QUERY_OPTION } from '@/shared/constant';
import { Button } from '@/shared/ui';

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery<UserResponse>(QUERY_OPTION.AUTH());
  const { mutate } = useMutation(
    MUTATE_OPTION.LOGOUT({ userId: data?.data.user_id as number }),
  );

  const handleLogout = async () => {
    mutate(undefined, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.AUTH }),
    });
  };

  return <Button onClick={handleLogout}>로그아웃</Button>;
};

export default LogoutButton;
