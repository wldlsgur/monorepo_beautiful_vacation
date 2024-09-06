import Lottie from 'react-lottie-player';
import { EMPTY_LOTTIE } from '@/shared/lottie';
import * as S from './style';

const RoomListEmpty = () => {
  return (
    <S.EmptyContainer>
      <Lottie
        animationData={EMPTY_LOTTIE}
        play
        loop
        speed={0.5}
        style={{ width: 200, height: 200 }}
      />
    </S.EmptyContainer>
  );
};

export default RoomListEmpty;
