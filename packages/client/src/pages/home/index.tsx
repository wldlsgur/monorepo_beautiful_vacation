import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { RoomListResponse } from 'common-types';
import { Tap } from 'jiponent';
import debounce from 'lodash/debounce';
import { useTheme } from 'styled-components';
import { QUERY_OPTION } from '@/shared/constant';
import { useInput } from '@/shared/hook';
import { LoginForm } from '@/widgets/auth/ui';
import { Header, RoomList, SearchBar } from '@/widgets/room/ui';
import { Profile } from '@/widgets/user';
import * as S from './style';

interface SearchKeyword {
  keyword: string;
}

const [offset, limit] = [0, 20];

const Home = () => {
  const theme = useTheme();
  const { data: user } = useQuery(QUERY_OPTION.AUTH());
  const {
    value: { keyword },
    handleChangeValue,
  } = useInput<SearchKeyword>({
    defaultValue: { keyword: '' },
  });
  const {
    data: roomListData,
    fetchNextPage: fetchNextRoomListPage,
    hasNextPage: hasNextRoomListPage,
    isFetching: isFetchingRoomList,
  } = useInfiniteQuery<RoomListResponse>(
    QUERY_OPTION.ROOM_LIST({ offset, limit }),
  );
  const {
    data: searchRoomData,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetching: isFetchingSearch,
  } = useInfiniteQuery<RoomListResponse>(
    QUERY_OPTION.SEARCH_ROOM({ keyword, offset, limit }),
  );

  const data = keyword ? searchRoomData : roomListData;
  const fetchNextPage = keyword ? fetchNextSearchPage : fetchNextRoomListPage;
  const hasNextPage = keyword ? hasNextSearchPage : hasNextRoomListPage;
  const isFetching = keyword ? isFetchingSearch : isFetchingRoomList;

  return (
    <S.Wrapper>
      <S.RoomContainer>
        <Header />
        <SearchBar onChange={debounce(handleChangeValue, 400)} />
        <RoomList
          data={data}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          fetchNextPage={() => fetchNextPage()}
        />
      </S.RoomContainer>
      <S.Sidebar>
        <Tap
          defaultIndex={0}
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          activeStyle={{
            color: theme.colors.textInverse,
            backgroundColor: theme.colors.primaryNormal,
          }}
          itemAttribute={{
            style: { padding: '1rem', fontWeight: 600 },
          }}
        >
          <Tap.Item
            index={0}
            title={user ? '내 정보' : '로그인'}
            content={user ? <Profile /> : <LoginForm />}
          />
          <Tap.Item
            index={1}
            title='참여 방'
            content='참여 방'
          />
          <Tap.Item
            index={2}
            title='만든 방'
            content='만든 방'
          />
        </Tap>
      </S.Sidebar>
    </S.Wrapper>
  );
};

export default Home;
