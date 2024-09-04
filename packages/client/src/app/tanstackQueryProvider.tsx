import { PropsWithChildren } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const isDevelopment = process.env.NODE_ENV === 'development';

const TanstackQueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({}),
    mutationCache: new MutationCache({}),
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
