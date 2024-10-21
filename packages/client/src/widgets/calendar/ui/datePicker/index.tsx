import * as S from './style';

interface Props {
  onChange: (newDate: string) => void;
}

const DatePicker = ({ onChange }: Props) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;

    onChange(newDate);
  };

  return (
    <S.DateInput
      type='date'
      onChange={handleDateChange}
    />
  );
};

export default DatePicker;
