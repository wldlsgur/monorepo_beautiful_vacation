import { Room, User } from 'common-types';
import { useGetParticipatedRoomList } from '@/entities/room';
import { withAuth } from '@/shared/hoc';
import { useInfinityList } from '@/shared/hook';
import { RoomListEmpty, RoomListSkeleton } from '@/shared/ui';
import { LoginForm } from '@/widgets/auth/ui';
import ParticipatedRoomItem from '../participatedRoomItem';
import * as S from './style';

interface Props {
  user: User;
}

const [offset, limit] = [0, 20];

const ParticipateRoomList = ({ user }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useGetParticipatedRoomList({ offset, limit });
  const ref = useInfinityList({ hasNextPage, isFetching, fetchNextPage });

  if (!data || data.pages[0].data.length === 0) {
    return <RoomListEmpty />;
  }

  return (
    <S.RoomList>
      {data?.pages.map((page, pageIndex) =>
        page.data.map((room: Room, roomIndex: number) => {
          const isLast =
            pageIndex === data.pages.length - 1 &&
            roomIndex === page.data.length - 1;

          return (
            <ParticipatedRoomItem
              key={room.room_id}
              roomData={room}
              user={user}
              ref={isLast ? ref : null}
            />
          );
        }),
      )}
      {isFetching && <RoomListSkeleton length={10} />}
    </S.RoomList>
  );
};

export default withAuth(ParticipateRoomList, LoginForm);
