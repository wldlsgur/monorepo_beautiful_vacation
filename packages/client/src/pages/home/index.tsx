import { useState } from 'react';
import { SearchBar } from '@/feature/room';
import { useRoomListData } from '@/widgets/room/hook';
import { Header, HomeTap, RoomList } from '@/widgets/room/ui';
import * as S from './style';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetching } = useRoomListData({
    keyword,
  });

  return (
    <S.Wrapper>
      <S.RoomContainer>
        <Header />
        <SearchBar onChange={(newKeyword) => setKeyword(newKeyword)} />
        <RoomList
          data={data}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          fetchNextPage={() => fetchNextPage()}
        />
      </S.RoomContainer>
      <S.Sidebar>
        <HomeTap />
      </S.Sidebar>
    </S.Wrapper>
  );
};

export default Home;
