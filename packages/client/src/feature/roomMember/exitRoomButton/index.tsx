import { Icon, useHover } from 'jiponent';
import { useTheme } from 'styled-components';
import { useExitRoomMember } from '@/entities/roomMember';
import * as S from './style';

interface Props {
  roomId: number;
}

const ExitRoomButton = ({ roomId }: Props) => {
  const theme = useTheme();
  const { mutate, isPending } = useExitRoomMember();
  const { ref, isHover } = useHover<HTMLButtonElement>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    mutate(roomId);
  };

  return (
    <S.Button
      ref={ref}
      onClick={handleClick}
      disabled={isPending}
    >
      <Icon
        name='trash-2'
        fill={isHover ? theme.colors.error : theme.colors.primaryReverse}
        size='1.5rem'
      />
    </S.Button>
  );
};

export default ExitRoomButton;
