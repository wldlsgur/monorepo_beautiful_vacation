import { ElementType, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY, QUERY_OPTION } from '@/shared/constant';

const withAuth = (
  WrappedComponent: ElementType,
  FallbackComponent: ElementType,
) => {
  const WithAuthComponent = (props: any) => {
    const queryClient = useQueryClient();
    const { data, isError } = useQuery(QUERY_OPTION.AUTH());
    const extendedProps = { ...props, user: data?.data };
    const isLogin = data?.data && !isError;

    useEffect(() => {
      if (isError) {
        queryClient.setQueryData(QUERY_KEY.AUTH, { data: null });
      }
    }, [isError, queryClient]);

    return isLogin ? (
      <WrappedComponent {...extendedProps} />
    ) : (
      <FallbackComponent {...props} />
    );
  };

  return WithAuthComponent;
};

export default withAuth;
