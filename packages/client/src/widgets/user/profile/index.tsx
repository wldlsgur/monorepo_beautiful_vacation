import { useQuery } from '@tanstack/react-query';
import { User } from 'common-types';
import { QUERY_OPTION } from '@/shared/constant';

const Profile = () => {
  useQuery<User>(QUERY_OPTION.AUTH());

  return <div>마이페이지</div>;
};

export default Profile;
