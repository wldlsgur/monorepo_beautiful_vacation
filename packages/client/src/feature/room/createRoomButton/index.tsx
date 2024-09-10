import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateRoomRequest } from 'common-types';
import { useFormContext } from 'react-hook-form';
import { MUTATE_OPTION } from '@/shared/constant';
import { Button } from '@/shared/ui';

const CreateRoomButton = () => {
  const queryClient = useQueryClient();
  const { handleSubmit, reset } = useFormContext<CreateRoomRequest>();
  const { mutate, isPending } = useMutation(
    MUTATE_OPTION.CREATE_ROOM({ queryClient }),
  );

  const onValid = (data: CreateRoomRequest) => {
    mutate(data);
    reset();
  };

  return (
    <Button
      type='submit'
      onClick={handleSubmit(onValid)}
      disabled={isPending}
    >
      방 만들기
    </Button>
  );
};

export default CreateRoomButton;
