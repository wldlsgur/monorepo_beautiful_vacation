import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MUTATE_OPTION } from '@/shared/constant';
import { Button } from '@/shared/ui';

interface Props {
  roomId: number;
}

const AccessRoomButton = ({ roomId }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleSubmit, setError } = useFormContext<{
    password: string;
  }>();
  const { mutate, isPending } = useMutation(
    MUTATE_OPTION.ACCESS_ROOM({ queryClient, setError, navigate }),
  );

  const onValid = (data: { password: string }) => {
    mutate({ roomId, password: data.password });
  };

  return (
    <Button
      type='submit'
      onClick={handleSubmit(onValid)}
      disabled={isPending}
    >
      방 입장하기
    </Button>
  );
};

export default AccessRoomButton;
