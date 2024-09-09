import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateRoomClientRequest } from 'common-types';
import { useFormContext } from 'react-hook-form';
import { MUTATE_OPTION } from '@/shared/constant';
import { Button } from '@/shared/ui';

const CreateRoomButton = () => {
  const queryClient = useQueryClient();
  const { handleSubmit, reset } = useFormContext<CreateRoomClientRequest>();
  const { mutate, isPending } = useMutation(
    MUTATE_OPTION.CREATE_ROOM({ queryClient }),
  );

  const onValid = (data: CreateRoomClientRequest) => {
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
