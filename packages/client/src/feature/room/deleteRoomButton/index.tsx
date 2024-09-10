import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Icon, useHover } from 'jiponent';
import { useTheme } from 'styled-components';
import { MUTATE_OPTION } from '@/shared/constant';
import * as S from './style';

interface Props {
  roomId: number;
}

const DeleteRoomButton = ({ roomId }: Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { ref, isHover } = useHover<HTMLButtonElement>();
  const { mutate, isPending } = useMutation(
    MUTATE_OPTION.DELETE_ROOM({ queryClient }),
  );

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

export default DeleteRoomButton;
