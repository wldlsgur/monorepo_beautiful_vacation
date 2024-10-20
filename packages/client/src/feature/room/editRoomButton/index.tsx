import { PatchRoomRequest } from 'common-types';
import { useFormContext } from 'react-hook-form';
import { usePatchRoom } from '@/entities/room';
import { Button } from '@/shared/ui';

interface Props {
  roomId: number;
}

const EditRoomButton = ({ roomId }: Props) => {
  const { mutate, isPending } = usePatchRoom();
  const { handleSubmit } = useFormContext<Omit<PatchRoomRequest, 'room_id'>>();

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
