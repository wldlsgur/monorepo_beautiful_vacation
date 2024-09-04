import { useEffect } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { Room, RoomListResponse } from 'common-types';
import { Skeleton } from 'jiponent';
import { useInView } from 'react-intersection-observer';
import Lottie from 'react-lottie-player';
import { EMPTY_LOTTIE } from '@/shared/lottie';
import RoomItem from '../roomItem';
import * as S from './style';

interface Props {
  data: InfiniteData<RoomListResponse> | undefined;
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
}

const RoomList = ({ data, hasNextPage, isFetching, fetchNextPage }: Props) => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetching]);

  if (!data || data.pages[0].data.length === 0) {
    return (
      <S.EmptyContainer>
        <Lottie
          animationData={EMPTY_LOTTIE}
          play
          loop
          speed={0.5}
          style={{ width: 200, height: 200 }}
        />
      </S.EmptyContainer>
    );
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
      {isFetching &&
        Array.from({ length: 9 }, (_, index) => (
          <S.LoadingItem key={index}>
            <Skeleton.Paragraph
              line={1}
              height='1.5rem'
              style={{ flexBasis: '80%' }}
            />
            <Skeleton.Paragraph
              line={1}
              height='1.5rem'
              style={{ flexBasis: '10%' }}
            />
          </S.LoadingItem>
        ))}
    </S.RoomList>
  );
};

export default RoomList;
