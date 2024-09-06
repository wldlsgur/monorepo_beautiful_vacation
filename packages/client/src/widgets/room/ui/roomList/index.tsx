import { InfiniteData } from '@tanstack/react-query';
import { Room, RoomListResponse } from 'common-types';
import { useInfinityList } from '@/shared/hook';
import { RoomListEmpty, RoomListSkeleton } from '@/shared/ui';
import RoomItem from '../roomItem';
import * as S from './style';

interface Props {
  data: InfiniteData<RoomListResponse> | undefined;
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
}

const RoomList = ({ data, hasNextPage, isFetching, fetchNextPage }: Props) => {
  const ref = useInfinityList({ hasNextPage, isFetching, fetchNextPage });

  if (!data || data.pages[0].data.length === 0) {
    return <RoomListEmpty />;
  }

  return (
    <S.RoomList>
      {data?.pages.map((page, pageIndex) =>
        page.data.map((room: Room, roomIndex) => {
          const isLast =
            pageIndex === data.pages.length - 1 &&
            roomIndex === page.data.length - 1;

          return (
            <RoomItem
              key={room.room_id}
              roomData={room}
              ref={isLast ? ref : null}
            />
          );
        }),
      )}
      {isFetching && <RoomListSkeleton length={9} />}
    </S.RoomList>
  );
};

export default RoomList;
