import { ComponentProps, ReactNode } from 'react';
import * as S from './style';

interface Props extends ComponentProps<'button'> {
  children: ReactNode;
}

const Button = ({ children, ...rest }: Props) => {
  return <S.Button {...rest}>{children}</S.Button>;
};

export default Button;
