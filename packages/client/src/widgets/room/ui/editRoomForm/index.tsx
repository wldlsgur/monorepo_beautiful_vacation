import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useGetRoom } from '@/entities/room';
import { EditRoomButton } from '@/feature/room';
import { withAuth } from '@/shared/hoc';
import { LoginForm } from '@/widgets/auth/ui';
import { ROOM_FORM } from '@/widgets/room/constant';
import * as S from './style';

interface Props {
  roomId: number;
}

const EditRoomForm = ({ roomId }: Props) => {
  const { data } = useGetRoom({ roomId });
  const methods = useForm({
    defaultValues: ROOM_FORM.DYNAMIC_DEFAULT_VALUES(data.data),
  });
  const { register, formState, setFocus } = methods;
  const { room_name, password, max_participants } = formState.errors;

  useEffect(() => {
    setFocus('room_name');
  }, [setFocus]);

  return (
    <FormProvider {...methods}>
      <S.Form>
        <S.Wrapper>
          <S.Label>제목</S.Label>
          <S.Text
            autoComplete='organization'
            {...register('room_name', ROOM_FORM.VALIDATION_RULES.ROOM_NAME)}
          />
          <S.ErrorMessage visible={!!room_name}>
            {room_name?.message}
          </S.ErrorMessage>
        </S.Wrapper>
        <S.Wrapper>
          <S.Label>비밀번호</S.Label>
          <S.Text
            type='password'
            autoComplete='new-password'
            {...register('password', ROOM_FORM.VALIDATION_RULES.PASSWORD)}
          />
          <S.ErrorMessage visible={!!password}>
            {password?.message}
          </S.ErrorMessage>
        </S.Wrapper>
        <S.Wrapper>
          <S.Label>최대 인원</S.Label>
          <S.Text
            type='number'
            {...register(
              'max_participants',
              ROOM_FORM.VALIDATION_RULES.MAX_PARTICIPANTS,
            )}
          />
          <S.ErrorMessage visible={!!max_participants}>
            {max_participants?.message}
          </S.ErrorMessage>
        </S.Wrapper>
        <EditRoomButton roomId={roomId} />
      </S.Form>
    </FormProvider>
  );
};

export default withAuth(EditRoomForm, LoginForm);
