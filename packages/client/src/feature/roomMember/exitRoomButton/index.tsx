import { Icon, useHover } from 'jiponent';
import { useTheme } from 'styled-components';
import * as S from './style';

const ExitRoomButton = () => {
  const theme = useTheme();
  const { ref, isHover } = useHover<HTMLButtonElement>();

  return (
    <S.Button ref={ref}>
      <Icon
        name='trash-2'
        fill={isHover ? theme.colors.error : theme.colors.primaryReverse}
        size='1.5rem'
      />
    </S.Button>
  );
};

export default ExitRoomButton;
