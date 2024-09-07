import { ElementType } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_OPTION } from '@/shared/constant';

const withAuth = <P extends object>(
  WrappedComponent: ElementType,
  FallbackComponent: ElementType,
) => {
  const WithAuthComponent = (props: P) => {
    const { data, isError } = useQuery(QUERY_OPTION.AUTH());
    const extendedProps = { ...props, user: data?.data };
    const isLogin = data?.data && !isError;

    return isLogin ? (
      <WrappedComponent {...extendedProps} />
    ) : (
      <FallbackComponent {...props} />
    );
  };

  return WithAuthComponent;
};

export default withAuth;
