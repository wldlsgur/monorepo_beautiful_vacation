import { Icon, useHover } from 'jiponent';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { DOMAIN_URL } from '@/shared/constant';
import * as S from './style';

interface Props {
  roomId: number;
}

const EditModalButton = ({ roomId }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { ref, isHover } = useHover<HTMLButtonElement>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(DOMAIN_URL.ROOM_EDIT(roomId));
  };

  return (
    <S.Button
      ref={ref}
      onClick={handleClick}
    >
      <Icon
        name='edit'
        fill={isHover ? theme.colors.warning : theme.colors.primaryReverse}
        size='1.5rem'
      />
    </S.Button>
  );
};

export default EditModalButton;
