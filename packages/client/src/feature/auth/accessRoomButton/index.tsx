import { useFormContext } from 'react-hook-form';
import { useAccessRoom } from '@/entities/auth';
import { Button } from '@/shared/ui';

interface Props {
  roomId: number;
}

const AccessRoomButton = ({ roomId }: Props) => {
  const { mutate, isPending } = useAccessRoom();
  const { handleSubmit } = useFormContext<{
    password: string;
  }>();

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
