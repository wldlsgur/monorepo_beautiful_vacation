import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  hasNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: () => void;
}

const useInfinityList = ({ hasNextPage, isFetching, fetchNextPage }: Props) => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetching]);

  return ref;
};

export default useInfinityList;
