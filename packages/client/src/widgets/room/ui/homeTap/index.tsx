import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components';
import { QUERY_OPTION } from '@/shared/constant';
import { Profile } from '@/widgets/user';
import * as S from './style';

const HomeTap = () => {
  const theme = useTheme();
  const { data, isError } = useQuery(QUERY_OPTION.AUTH());
  const isLogin = data?.data && !isError;

  return (
    <S.HomeTap
      defaultIndex={0}
      activeStyle={{
        color: theme.colors.textInverse,
        backgroundColor: theme.colors.primaryNormal,
        fontWeight: 700,
      }}
    >
      <S.HomeTapItem
        index={0}
        title={isLogin ? '내 정보' : '로그인'}
        content={<Profile />}
      />
      <S.HomeTapItem
        index={1}
        title='참여 방'
        content='참여 방'
      />
      <S.HomeTapItem
        index={2}
        title='만든 방'
        content='만든 방'
      />
      <S.HomeTapItem
        index={3}
        title='방 생성'
        content='만든 방'
      />
    </S.HomeTap>
  );
};

export default HomeTap;
