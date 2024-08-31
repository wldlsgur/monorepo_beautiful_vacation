import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RoomListResponse, Room } from 'common-types';
import { useInView } from 'react-intersection-observer';
import { QUERY_OPTION } from '@/shared/Constant';
import RoomItem from '../RoomItem';
import * as S from './style';

const [offset, limit] = [0, 20];

const RoomList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<RoomListResponse>(
      QUERY_OPTION.ROOM_LIST({ offset, limit }),
    );
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetching]);

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
    </S.RoomList>
  );
};

export default RoomList;
