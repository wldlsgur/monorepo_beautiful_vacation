import { Skeleton } from 'jiponent';
import * as S from './style';

interface Props {
  length: number;
}

const RoomListSkeleton = ({ length }: Props) => {
  return Array.from({ length }, (_, index) => (
    <S.LoadingItem key={index}>
      <Skeleton.Paragraph
        line={1}
        height='1.5rem'
        style={{ flexBasis: '80%' }}
      />
      <Skeleton.Paragraph
        line={1}
        height='1.5rem'
        style={{ flexBasis: '10%' }}
      />
    </S.LoadingItem>
  ));
};

export default RoomListSkeleton;
