import { Dayjs } from 'dayjs';
import { FORMAT_TYPE } from '@/widgets/calendar/constant';
import * as S from './style';

interface Props {
  date: Dayjs;
}

const CurrentDateTitle = ({ date }: Props) => {
  return <S.Date>{date.format(FORMAT_TYPE)}</S.Date>;
};

export default CurrentDateTitle;
