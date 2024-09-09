// import { useInfiniteQuery } from '@tanstack/react-query';
// import { QUERY_OPTION } from '@/shared/constant';
import { withAuth } from '@/shared/hoc';
// import { useInfinityList } from '@/shared/hook';
// import { RoomListEmpty } from '@/shared/ui';
import { LoginForm } from '@/widgets/auth/ui';
import * as S from './style';

// const [offset, limit] = [0, 20];

const ParticipateRoomList = () => {
  //   const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
  //     QUERY_OPTION.PARTICIPATE_ROOM({ offset, limit }),
  //   );
  //   const ref = useInfinityList({ hasNextPage, isFetching, fetchNextPage });

  //   if (!data || data.pages[0].data.length === 0) {
  //     return <RoomListEmpty />;
  //   }

  return <S.RoomList>ㅗㅑ</S.RoomList>;
};

export default withAuth(ParticipateRoomList, LoginForm);
