import { ForwardedRef, forwardRef } from 'react';
import { Room, User } from 'common-types';
import { DeleteRoomButton, EditModalButton } from '@/feature/room';
import { ExitRoomButton } from '@/feature/roomMember';
import * as S from './style';

interface Props {
  roomData: Room;
  user: User;
}

const ParticipatedRoomItem = forwardRef(
  ({ roomData, user }: Props, ref: ForwardedRef<HTMLLIElement>) => {
    const {
      room_id,
      room_name,
      current_participants,
      max_participants,
      owner_id,
    } = roomData;
    const isOwner = user.user_id === owner_id;

    return (
      <S.RoomItem ref={ref}>
        <S.RoomTitle>{room_name}</S.RoomTitle>
        <S.Participants>
          {`${current_participants} / ${max_participants}`}
        </S.Participants>
        <S.InteractionContainer>
          {!isOwner && <ExitRoomButton roomId={room_id} />}
          {isOwner && <DeleteRoomButton roomId={room_id} />}
          {isOwner && <EditModalButton roomId={room_id} />}
        </S.InteractionContainer>
      </S.RoomItem>
    );
  },
);

export default ParticipatedRoomItem;
