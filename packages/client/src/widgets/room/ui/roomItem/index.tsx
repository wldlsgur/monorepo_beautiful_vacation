import { ForwardedRef, forwardRef } from 'react';
import { Room } from 'common-types';
import * as S from './style';

interface Props {
  roomData: Room;
}

const RoomItem = forwardRef(
  ({ roomData }: Props, ref: ForwardedRef<HTMLLIElement>) => {
    const { room_name, current_participants, max_participants } = roomData;

    return (
      <S.RoomItem ref={ref}>
        <S.RoomTitle>{room_name}</S.RoomTitle>
        <S.Participants>
          {`${current_participants} / ${max_participants}`}
        </S.Participants>
      </S.RoomItem>
    );
  },
);

export default RoomItem;
