import { PropsWithChildren } from 'react';
import * as S from './style';

const DateItemContainer = ({ children }: PropsWithChildren) => {
  return <S.DateItem>{children}</S.DateItem>;
};

interface DateItemDateProps {
  dayOfMonth: number;
  weekday: number;
  isHoliday: boolean;
  dateName?: string;
}

const DateItemHeader = ({
  dayOfMonth,
  weekday,
  isHoliday,
  dateName,
}: DateItemDateProps) => {
  return (
    <S.DateHeader
      $isHoliday={isHoliday}
      $weekday={weekday}
    >
      <S.DateText>{dayOfMonth}</S.DateText>
      <S.DateText>{dateName}</S.DateText>
    </S.DateHeader>
  );
};

export default {
  Container: DateItemContainer,
  Header: DateItemHeader,
};
