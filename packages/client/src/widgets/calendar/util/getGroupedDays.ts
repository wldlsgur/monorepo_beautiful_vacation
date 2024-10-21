import { Dayjs } from 'dayjs';

export interface DayInfo {
  date: string;
  dayOfMonth: number;
  weekday: number;
}

export const getGroupedDays = (date: Dayjs): Array<Array<DayInfo>> => {
  const startOfWeek = date.startOf('month').startOf('week');
  const endOfWeek = date.endOf('month').endOf('week');

  const totalDays = endOfWeek.diff(startOfWeek, 'day') + 1;

  return Array.from({ length: totalDays }, (_, index) => {
    const day = startOfWeek.add(index, 'day');
    return {
      date: day.format('YYYY-MM-DD'),
      dayOfMonth: day.date(),
      weekday: day.day(),
    };
  }).reduce(
    (acc, curr, index) => {
      if (index % 7 === 0) acc.push([]);
      acc[acc.length - 1].push(curr);
      return acc;
    },
    [] as Array<Array<DayInfo>>,
  );
};
