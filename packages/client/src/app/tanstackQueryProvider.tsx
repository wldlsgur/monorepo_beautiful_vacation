import { PropsWithChildren } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_URL, QUERY_KEY, QUERY_OPTION } from '@/shared/constant';

const isDevelopment = process.env.NODE_ENV === 'development';

const TanstackQueryProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: async (error, { queryKey }) => {
        const { status } = error as unknown as AxiosError;

        if (status === 401 && queryKey !== QUERY_KEY.REISSUE_TOKEN) {
          try {
            await queryClient.fetchQuery(QUERY_OPTION.REISSUE_TOKEN());

            if (queryKey === QUERY_KEY.AUTH) {
              queryClient.invalidateQueries({ queryKey });
            }
          } catch {
            navigate(DOMAIN_URL.HOME);
            if (queryKey !== QUERY_KEY.AUTH) {
              queryClient.invalidateQueries({ queryKey });
            }
          }
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: async (error) => {
        const { status } = error as unknown as AxiosError;

        if (status === 401) {
          queryClient.invalidateQueries({ queryKey: QUERY_KEY.AUTH });
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
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default TanstackQueryProvider;
