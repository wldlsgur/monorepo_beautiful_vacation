import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { withAuth } from '@/shared/hoc';
import { LoginForm } from '@/widgets/auth/ui';
import { ROOM_FORM_POST } from '@/widgets/room/constant';
import CreateRoomButton from '../createRoomButton';
import * as S from './style';

const RoomForm = () => {
  const methods = useForm({ defaultValues: ROOM_FORM_POST.DEFAULT_VALUES });
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
            {...register(
              'room_name',
              ROOM_FORM_POST.VALIDATION_RULES.ROOM_NAME,
            )}
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
            {...register('password', ROOM_FORM_POST.VALIDATION_RULES.PASSWORD)}
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
              ROOM_FORM_POST.VALIDATION_RULES.MAX_PARTICIPANTS,
            )}
          />
          <S.ErrorMessage visible={!!max_participants}>
            {max_participants?.message}
          </S.ErrorMessage>
        </S.Wrapper>
        <CreateRoomButton />
      </S.Form>
    </FormProvider>
  );
};

export default withAuth(RoomForm, LoginForm);
