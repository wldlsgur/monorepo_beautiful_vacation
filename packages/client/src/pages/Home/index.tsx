import { Header, RoomList, SearchBar } from '@/widgets/Room/Ui';
import * as S from './style';

const Home = () => {
  return (
    <S.Wrapper>
      <S.RoomContainer>
        <Header />
        <SearchBar />
        <RoomList />
      </S.RoomContainer>
      <S.Sidebar />
    </S.Wrapper>
  );
};

export default Home;
