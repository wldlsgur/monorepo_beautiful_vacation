import { withIdValidation } from '@/shared/hoc';
import { Calendar, Title } from '@/widgets/calendar/ui';
import * as S from './style';

const Room = () => {
  return (
    <S.Wrapper>
      <S.CalendarContainer>
        <Title />
        <Calendar />
      </S.CalendarContainer>
      <S.Sidebar />
    </S.Wrapper>
  );
};

export default withIdValidation(Room);
