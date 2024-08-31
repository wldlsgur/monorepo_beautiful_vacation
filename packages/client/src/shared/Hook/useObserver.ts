import { useEffect, useRef, useState } from 'react';

interface Props {
  threshold?: number;
}

const useObserver = <T extends HTMLElement>({ threshold }: Props) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const onIntersection = (
      entries: IntersectionObserverEntry[],
      io: IntersectionObserver,
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          return io.unobserve(entry.target);
        }
        setInView(false);
      });
    };

    const observer = new IntersectionObserver(onIntersection, { threshold });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, ref]);

  return { ref, inView };
};

export default useObserver;
