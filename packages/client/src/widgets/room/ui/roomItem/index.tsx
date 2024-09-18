import { ForwardedRef, forwardRef } from 'react';
import { Room } from 'common-types';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_URL } from '@/shared/constant';
import * as S from './style';

interface Props {
  roomData: Room;
}

const RoomItem = forwardRef(
  ({ roomData }: Props, ref: ForwardedRef<HTMLLIElement>) => {
    const navigate = useNavigate();
    const { room_id, room_name, current_participants, max_participants } =
      roomData;

    return (
      <S.RoomItem
        ref={ref}
        onClick={() => navigate(DOMAIN_URL.ROOM_ACCESS(room_id))}
      >
        <S.RoomTitle>{room_name}</S.RoomTitle>
        <S.Participants>
          {`${current_participants} / ${max_participants}`}
        </S.Participants>
      </S.RoomItem>
    );
  },
);

export default RoomItem;
