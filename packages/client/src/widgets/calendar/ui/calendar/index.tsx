import { useState } from 'react';
import dayjs from 'dayjs';
import { CurrentDateTitle, DatePicker } from '@/widgets/calendar/ui';
import * as S from './style';

const formatType = 'YYYY년 MM월 DD일';

const Calendar = () => {
  const [date, setDate] = useState(() => dayjs().format(formatType));

  return (
    <S.TableContainer>
      <S.TableHeader>
        <CurrentDateTitle date={date} />
        <DatePicker
          date={date}
          onChange={(newDate: string) =>
            setDate(dayjs(newDate).format(formatType))
          }
        />
      </S.TableHeader>
    </S.TableContainer>
  );
};

export default Calendar;
