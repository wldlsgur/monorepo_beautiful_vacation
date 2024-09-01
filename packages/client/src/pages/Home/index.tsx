import { useInfiniteQuery } from '@tanstack/react-query';
import { RoomListResponse } from 'common-types';
import debounce from 'lodash/debounce';
import { QUERY_OPTION } from '@/shared/Constant';
import { useInput } from '@/shared/Hook';
import { Header, RoomList, SearchBar } from '@/widgets/Room/Ui';
import * as S from './style';

interface SearchKeyword {
  keyword: string;
}

const [offset, limit] = [0, 20];

const Home = () => {
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
      <S.Sidebar />
    </S.Wrapper>
  );
};

export default Home;
