import { useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { RoomResponse } from 'common-types';
import { FormProvider, useForm } from 'react-hook-form';
import { AccessRoomButton } from '@/feature/auth';
import { QUERY_OPTION } from '@/shared/constant';
import { withAuth } from '@/shared/hoc';
import { LoginForm } from '@/widgets/auth/ui';
import { ACCESS_ROOM_FORM } from '../constant';
import * as S from './style';

interface Props {
  roomId: number;
}

const RoomAccessForm = ({ roomId }: Props) => {
  const { data } = useSuspenseQuery<RoomResponse>(
    QUERY_OPTION.ROOM({ roomId }),
  );
  const methods = useForm({
    defaultValues: ACCESS_ROOM_FORM.DEFAULT_VALUES,
  });
  const { register, formState, setFocus } = methods;
  const { password, participants } = formState.errors;
  const { room_name, max_participants, current_participants } = data.data;

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  return (
    <FormProvider {...methods}>
      <S.Form>
        <S.Wrapper style={{ display: 'none' }}>
          <S.Text
            type='text'
            autoComplete='username'
          />
        </S.Wrapper>
        <S.Wrapper>
          <S.Label htmlFor='title'>제목</S.Label>
          <S.Title id='title'>{room_name}</S.Title>
        </S.Wrapper>
        <S.Wrapper>
          <S.Label htmlFor='password'>비밀번호</S.Label>
          <S.Text
            id='password'
            type='password'
            autoComplete='new-password'
            {...register(
              'password',
              ACCESS_ROOM_FORM.VALIDATION_RULES.PASSWORD,
            )}
          />
          <S.ErrorMessage visible={!!password}>
            {password?.message}
          </S.ErrorMessage>
        </S.Wrapper>
        <S.Wrapper>
          <S.Label htmlFor='current_participants'>현재 인원 </S.Label>
          <S.Participants id='current_participants'>
            {`${current_participants} 명`}
          </S.Participants>
          <S.ErrorMessage visible={!!participants}>
            {participants?.message}
          </S.ErrorMessage>
        </S.Wrapper>
        <S.Wrapper>
          <S.Label htmlFor='max_participants'>최대 인원</S.Label>
          <S.Participants id='max_participants'>
            {`${max_participants} 명`}
          </S.Participants>
        </S.Wrapper>
        <AccessRoomButton roomId={roomId} />
      </S.Form>
    </FormProvider>
  );
};

export default withAuth(RoomAccessForm, LoginForm);
