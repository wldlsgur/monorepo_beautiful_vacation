import dayjs from 'dayjs';
import * as S from './style';

interface Props {
  date: string;
  onChange: (newDate: string) => void;
}

const DatePicker = ({ date, onChange }: Props) => {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;

    onChange(newDate);
  };

  return (
    <S.DateInput
      type='date'
      value={formattedDate}
      onChange={handleDateChange}
    />
  );
};

export default DatePicker;
