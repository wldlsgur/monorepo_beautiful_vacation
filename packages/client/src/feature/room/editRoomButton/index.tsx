import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PatchRoomRequest } from 'common-types';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MUTATE_OPTION } from '@/shared/constant';
import { Button } from '@/shared/ui';

interface Props {
  roomId: number;
}

const EditRoomButton = ({ roomId }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleSubmit } = useFormContext<Omit<PatchRoomRequest, 'room_id'>>();
  const { mutate, isPending } = useMutation(
    MUTATE_OPTION.PATCH_ROOM({ queryClient, navigate }),
  );

  const onValid = (data: Omit<PatchRoomRequest, 'room_id'>) => {
    mutate({ room_id: roomId, ...data });
  };

  return (
    <Button
      type='submit'
      onClick={handleSubmit(onValid)}
      disabled={isPending}
    >
      방 수정하기
    </Button>
  );
};

export default EditRoomButton;
