import { Icon } from 'jiponent';
import { useTheme } from 'styled-components';
import * as S from './style';

const Header = () => {
  const theme = useTheme();

  return (
    <S.Container>
      <Icon
        name='calendar'
        fill={theme.colors.background}
        color={theme.colors.primaryNormal}
        size='3rem'
      />
      <S.Title>화려한 휴가</S.Title>
    </S.Container>
  );
};

export default Header;
