import { v4 as uuidv4 } from 'uuid';
import { useFetchHolidays } from '@/entities/date';
import { DayInfo } from '@/widgets/calendar/util';
import { DateItem } from '..';
import * as S from './style';

interface Props {
  currentYear: number;
  currentMonth: number;
  dateList: DayInfo[][];
}

const DateList = ({ dateList, currentYear, currentMonth }: Props) => {
  const { data: holidays } = useFetchHolidays(currentYear, currentMonth);

  return (
    <>
      {dateList.map((row) => (
        <S.DateRow key={uuidv4()}>
          {row.map(({ date, dayOfMonth, weekday }) => {
            const holiday = holidays?.find(
              ({ locdate }) => String(locdate) === date.replace(/-/g, ''),
            );

            return (
              <DateItem.Container key={uuidv4()}>
                <DateItem.Header
                  isHoliday={!!holiday}
                  dateName={holiday?.dateName}
                  dayOfMonth={dayOfMonth}
                  weekday={weekday}
                />
              </DateItem.Container>
            );
          })}
        </S.DateRow>
      ))}
    </>
  );
};

export default DateList;
