import { ForwardedRef, forwardRef } from 'react';
import { Room, User } from 'common-types';
import { useNavigate } from 'react-router-dom';
import { DeleteRoomButton, EditModalButton } from '@/feature/room';
import { ExitRoomButton } from '@/feature/roomMember';
import { DOMAIN_URL } from '@/shared/constant';
import * as S from './style';

interface Props {
  roomData: Room;
  user: User;
}

const ParticipatedRoomItem = forwardRef(
  ({ roomData, user }: Props, ref: ForwardedRef<HTMLLIElement>) => {
    const navigate = useNavigate();
    const {
      room_id,
      room_name,
      current_participants,
      max_participants,
      owner_id,
    } = roomData;
    const isOwner = user.user_id === owner_id;

    return (
      <S.RoomItem
        ref={ref}
        onClick={() => navigate(DOMAIN_URL.ROOM_ACCESS(room_id))}
      >
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
