import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_OPTION } from '@/shared/constant';

interface Props {
  keyword: string;
}

const [offset, limit] = [0, 20];

const useRoomListData = ({ keyword }: Props) => {
  const {
    data: roomListData,
    fetchNextPage: fetchNextRoomListPage,
    hasNextPage: hasNextRoomListPage,
    isFetching: isFetchingRoomList,
  } = useInfiniteQuery(QUERY_OPTION.ROOM_LIST({ offset, limit }));

  const {
    data: searchRoomData,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetching: isFetchingSearch,
  } = useInfiniteQuery(QUERY_OPTION.SEARCH_ROOM({ keyword, offset, limit }));

  const data = keyword ? searchRoomData : roomListData;
  const fetchNextPage = keyword ? fetchNextSearchPage : fetchNextRoomListPage;
  const hasNextPage = keyword ? hasNextSearchPage : hasNextRoomListPage;
  const isFetching = keyword ? isFetchingSearch : isFetchingRoomList;

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  };
};

export default useRoomListData;
