import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CONFIG, QUERY_KEY } from '@/shared/constant';

export const fetchHolidays = async (year: number) => {
  const response = await axios.get(
    `${CONFIG.HOLIDAYS_API_BASE_URL}/getHoliDeInfo`,
    {
      params: {
        ServiceKey: CONFIG.HOLIDAYS_SERVICE_KEY,
        solYear: year,
        numOfRows: 100,
        _type: 'json',
      },
    },
  );

  return response.data.response.body.items.item;
};

export const useFetchHolidays = (year: number) => {
  return useQuery({
    queryKey: QUERY_KEY.HOLIDAYS(year),
    queryFn: () => fetchHolidays(year),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: year > 0,
  });
};
