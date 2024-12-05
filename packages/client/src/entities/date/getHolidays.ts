import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CONFIG, QUERY_KEY } from '@/shared/constant';

export const fetchHolidays = async (year: number, month: number) => {
  const response = await axios.get(
    `${CONFIG.HOLIDAYS_API_BASE_URL}/getHoliDeInfo`,
    {
      params: {
        ServiceKey: CONFIG.HOLIDAYS_SERVICE_KEY,
        solYear: year,
        solMonth: month.toString().padStart(2, '0'),
        numOfRows: 100,
        _type: 'json',
      },
    },
  );

  return response.data.response.body.items.item;
};

export const useFetchHolidays = (year: number, month: number) => {
  return useQuery({
    queryKey: QUERY_KEY.HOLIDAYS(year, month),
    queryFn: () => fetchHolidays(year, month),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: year > 0 && month > 0 && month <= 12,
    select: (holidays) => {
      if (Array.isArray(holidays)) {
        return holidays.map((holiday) => ({
          ...holiday,
          day: parseInt(holiday.locdate.toString().slice(-2), 10),
        }));
      }

      const holidayWithDay = {
        ...holidays,
        day: parseInt(holidays.locdate.toString().slice(-2), 10),
      };

      return [holidayWithDay];
    },
  });
};
