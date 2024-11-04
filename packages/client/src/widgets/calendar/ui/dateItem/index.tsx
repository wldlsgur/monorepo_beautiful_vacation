import { PropsWithChildren } from 'react';
import * as S from './style';

const DateItemContainer = ({ children }: PropsWithChildren) => {
  return <S.DateItem>{children}</S.DateItem>;
};

const DateItemDate = ({
  dayOfMonth,
  weekday,
}: {
  dayOfMonth: number;
  weekday: number;
}) => {
  return <S.DateOfMonth $weekday={weekday}>{dayOfMonth}</S.DateOfMonth>;
};

export default {
  Container: DateItemContainer,
  Date: DateItemDate,
};
