import { User } from 'common-types';
import { Avatar } from 'jiponent';
import { withAuth } from '@/shared/hoc';
import { LoginForm, LogoutButton } from '@/widgets/auth/ui';
import * as S from './style';

interface Props {
  user: User;
}

const Profile = ({ user }: Props) => {
  const { username, profile_image } = user;

  return (
    <S.Wrapper>
      <S.UserContainer>
        <Avatar
          src={profile_image}
          alt='프로필 이미지'
        />
        <S.Name>{username}</S.Name>
      </S.UserContainer>
      <LogoutButton />
    </S.Wrapper>
  );
};

export default withAuth(Profile, LoginForm);
