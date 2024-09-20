import { PropsWithChildren, useState } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useLocation, useNavigate } from 'react-router-dom';
import { DOMAIN_URL, QUERY_KEY, QUERY_OPTION } from '@/shared/constant';

const isDevelopment = process.env.NODE_ENV === 'development';

const TanstackQueryProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: async (error, { queryKey }) => {
            const { status, response } = error as any;
            const { message } = response.data;

            if (
              status === 401 &&
              queryKey !== QUERY_KEY.REISSUE_TOKEN &&
              (message === 'accessToken is missing' ||
                message === 'invalid accessToken')
            ) {
              try {
                await queryClient.fetchQuery(QUERY_OPTION.REISSUE_TOKEN());

                queryClient.invalidateQueries({ queryKey });
              } catch {
                if (pathname !== DOMAIN_URL.HOME) {
                  navigate(DOMAIN_URL.HOME);
                }

                queryClient.setQueryData(QUERY_KEY.AUTH, { data: null });
              }
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: async (error, variables, _, mutation) => {
            const { status, response } = error as any;
            const { message } = response.data;

            if (
              status === 401 &&
              (message === 'accessToken is missing' ||
                message === 'invalid accessToken')
            ) {
              try {
                await queryClient.fetchQuery(QUERY_OPTION.REISSUE_TOKEN());

                if (mutation?.options?.mutationFn && variables) {
                  const { mutationFn, onSuccess } = mutation.options;
                  const { context, data } = mutation.state;

                  await mutationFn(variables);

                  if (onSuccess) {
                    onSuccess(data, variables, context);
                  }
                }
              } catch {
                if (pathname !== DOMAIN_URL.HOME) {
                  navigate(DOMAIN_URL.HOME);
                }

                queryClient.setQueryData(QUERY_KEY.AUTH, { data: null });
              }
            }
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 0,
            gcTime: 0,
            retry: false,
            refetchOnWindowFocus: false,
            retryOnMount: false,
            refetchOnMount: false,
            refetchInterval: false,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default TanstackQueryProvider;
