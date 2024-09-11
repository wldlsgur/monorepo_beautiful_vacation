import { ComponentProps } from 'react';
import Lottie from 'react-lottie-player';
import { SPINNER_LOTTIE } from '@/shared/lottie';
import * as S from './style';

interface Props extends ComponentProps<'div'> {
  width?: string | number;
  height?: string | number;
}

const Spinner = ({ width, height, ...rest }: Props) => {
  return (
    <S.Wrapper
      $width={width}
      $height={height}
      {...rest}
    >
      <Lottie
        animationData={SPINNER_LOTTIE}
        play
        loop
        speed={3}
        style={{ width: 200, height: 200 }}
      />
    </S.Wrapper>
  );
};

export default Spinner;
