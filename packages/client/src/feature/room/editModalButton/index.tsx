import { Icon, useHover } from 'jiponent';
import { useTheme } from 'styled-components';
import { DOMAIN_URL } from '@/shared/constant';
import * as S from './style';

interface Props {
  roomId: number;
}

const EditModalButton = ({ roomId }: Props) => {
  const theme = useTheme();
  const { ref, isHover } = useHover<HTMLAnchorElement>();

  return (
    <S.Linker
      ref={ref}
      to={DOMAIN_URL.ROOM_EDIT(roomId)}
    >
      <Icon
        name='edit'
        fill={isHover ? theme.colors.warning : theme.colors.primaryReverse}
        size='1.5rem'
      />
    </S.Linker>
  );
};

export default EditModalButton;
