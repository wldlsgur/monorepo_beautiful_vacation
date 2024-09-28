import { withIdValidation } from '@/shared/hoc';
import * as S from './style';

const Room = () => {
  return (
    <S.Wrapper>
      <S.CalendarContainer />
      <S.Sidebar />
    </S.Wrapper>
  );
};

export default withIdValidation(Room);
