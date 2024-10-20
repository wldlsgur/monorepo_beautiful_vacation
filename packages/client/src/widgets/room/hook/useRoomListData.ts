import { useGetRoomList, useGetSearchRoomList } from '@/entities/room';

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
  } = useGetRoomList({ offset, limit });
  const {
    data: searchRoomData,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetching: isFetchingSearch,
  } = useGetSearchRoomList({ keyword, offset, limit });

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
