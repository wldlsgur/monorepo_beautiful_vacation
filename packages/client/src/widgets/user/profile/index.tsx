import { useQuery } from '@tanstack/react-query';
import { UserResponse } from 'common-types';
import { Avatar } from 'jiponent';
import { QUERY_OPTION } from '@/shared/constant';
import { Button } from '@/shared/ui';
import * as S from './style';

const Profile = () => {
  const { data } = useQuery<UserResponse>(QUERY_OPTION.AUTH());

  if (!data?.data) {
    return;
  }
  const { username, profile_image } = data.data;

  return (
    <S.Wrapper>
      <S.UserContainer>
        <Avatar
          src={profile_image}
          alt='프로필 이미지'
        />
        <S.Name>{username}</S.Name>
      </S.UserContainer>
      <Button>로그아웃</Button>
    </S.Wrapper>
  );
};

export default Profile;
