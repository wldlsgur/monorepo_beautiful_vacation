import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CurrentDateTitle, DatePicker, DayList } from '@/widgets/calendar/ui';
import { getGroupedDays } from '../../util';
import * as S from './style';

const Calendar = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const groupedDays = useMemo(() => getGroupedDays(date), [date]);
  // eslint-disable-next-line no-console
  console.log(groupedDays);
  return (
    <S.CalendarContainer>
      <S.DateContainer>
        <CurrentDateTitle date={date} />
        <DatePicker onChange={(newDate: string) => setDate(dayjs(newDate))} />
      </S.DateContainer>
      <S.TableContainer>
        <S.TableHeader>
          <DayList />
        </S.TableHeader>
        <S.TableBody />
      </S.TableContainer>
    </S.CalendarContainer>
  );
};

export default Calendar;
