import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  CurrentDateTitle,
  DateList,
  DatePicker,
  DayList,
} from '@/widgets/calendar/ui';
import { getGroupedDays } from '@/widgets/calendar/util';
import * as S from './style';

const Calendar = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const groupedDays = useMemo(() => getGroupedDays(date), [date]);

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
        <S.TableBody>
          <DateList dateList={groupedDays} />
        </S.TableBody>
      </S.TableContainer>
    </S.CalendarContainer>
  );
};

export default Calendar;
