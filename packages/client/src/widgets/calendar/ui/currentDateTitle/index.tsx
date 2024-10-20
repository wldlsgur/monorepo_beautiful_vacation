import * as S from './style';

interface Props {
  date: string;
}

const CurrentDateTitle = ({ date }: Props) => {
  return <S.Date>{date}</S.Date>;
};

export default CurrentDateTitle;
