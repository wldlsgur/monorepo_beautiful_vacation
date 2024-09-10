import { ForwardedRef, forwardRef } from 'react';
import { Room } from 'common-types';
import { DeleteRoomButton, EditModalButton } from '@/feature/room';
import * as S from './style';

interface Props {
  roomData: Room;
}

const ParticipatedRoomItem = forwardRef(
  ({ roomData }: Props, ref: ForwardedRef<HTMLLIElement>) => {
    const { room_id, room_name, current_participants, max_participants } =
      roomData;

    return (
      <S.RoomItem ref={ref}>
        <S.RoomTitle>{room_name}</S.RoomTitle>
        <S.Participants>
          {`${current_participants} / ${max_participants}`}
        </S.Participants>
        <DeleteRoomButton roomId={room_id} />
        <EditModalButton roomId={room_id} />
      </S.RoomItem>
    );
  },
);

export default ParticipatedRoomItem;
