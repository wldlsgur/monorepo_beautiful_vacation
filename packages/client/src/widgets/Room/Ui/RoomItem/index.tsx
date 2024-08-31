import { ForwardedRef, forwardRef } from 'react';
import { Room } from 'common-types';
import * as S from './Style';

interface Props {
  roomData: Room;
}

const RoomItem = forwardRef(
  ({ roomData }: Props, ref: ForwardedRef<HTMLLIElement>) => {
    return (
      <S.RoomItem ref={ref}>
        <h2>{roomData.room_name}</h2>
      </S.RoomItem>
    );
  },
);

export default RoomItem;
