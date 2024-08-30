import { Header, SearchBar } from '@/widgets/Room/Ui';
import * as S from './style';

const Home = () => {
  return (
    <S.Wrapper>
      <S.RoomContainer>
        <Header />
        <SearchBar />
      </S.RoomContainer>
      <S.Sidebar />
    </S.Wrapper>
  );
};

export default Home;
