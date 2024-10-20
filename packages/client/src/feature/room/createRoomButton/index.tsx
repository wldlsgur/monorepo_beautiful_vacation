import { CreateRoomRequest } from 'common-types';
import { useFormContext } from 'react-hook-form';
import { usePostRoom } from '@/entities/room';
import { Button } from '@/shared/ui';

const CreateRoomButton = () => {
  const { handleSubmit, reset } = useFormContext<CreateRoomRequest>();
  const { mutate, isPending } = usePostRoom();

  const onValid = (data: CreateRoomRequest) => {
    mutate(data);
    reset();
  };

  return (
    <Button
      type='button'
      onClick={handleSubmit(onValid)}
      disabled={isPending}
    >
      방 만들기
    </Button>
  );
};

export default CreateRoomButton;
