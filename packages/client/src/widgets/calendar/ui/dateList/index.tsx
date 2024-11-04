import { v4 as uuidv4 } from 'uuid';
import { useFetchHolidays } from '@/entities/date';
import { DayInfo } from '@/widgets/calendar/util';
import { DateItem } from '..';
import * as S from './style';

interface Props {
  dateList: DayInfo[][];
}

const DateList = ({ dateList }: Props) => {
  useFetchHolidays(2024);

  return (
    <>
      {dateList.map((row) => (
        <S.DateRow key={uuidv4()}>
          {row.map(({ dayOfMonth, weekday }) => (
            <DateItem.Container key={uuidv4()}>
              <DateItem.Date
                dayOfMonth={dayOfMonth}
                weekday={weekday}
              />
            </DateItem.Container>
          ))}
        </S.DateRow>
      ))}
    </>
  );
};

export default DateList;
