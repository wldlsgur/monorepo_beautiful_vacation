import { useQuery } from '@tanstack/react-query';
import { Tap } from 'jiponent';
import { useTheme } from 'styled-components';
import { QUERY_OPTION } from '@/shared/constant';
import { LoginForm } from '@/widgets/auth/ui';
import { Profile } from '@/widgets/user';

const HomeTap = () => {
  const theme = useTheme();
  const { data, isError } = useQuery(QUERY_OPTION.AUTH());
  const isLogin = data?.data && !isError;

  return (
    <Tap
      defaultIndex={0}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.surface,
        borderRadius: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      activeStyle={{
        color: theme.colors.textInverse,
        backgroundColor: theme.colors.primaryNormal,
        fontWeight: 700,
      }}
      itemAttribute={{
        style: {
          padding: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          borderRadius: '0.5rem',
        },
      }}
    >
      <Tap.Item
        index={0}
        title={isLogin ? '내 정보' : '로그인'}
        content={isLogin ? <Profile /> : <LoginForm />}
      />
      <Tap.Item
        index={1}
        title='참여 방'
        content='참여 방'
      />
      <Tap.Item
        index={2}
        title='만든 방'
        content='만든 방'
      />
    </Tap>
  );
};

export default HomeTap;
