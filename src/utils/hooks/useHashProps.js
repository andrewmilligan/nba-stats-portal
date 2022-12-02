import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const useHashProps = function useHashProps() {
  const router = useRouter();
  const path = router.asPath;
  const [hashProps, setHashProps] = useState({});

  console.log({ path, router });

  useEffect(() => {
    const updateHashProps = () => {
      const hash = window.location.hash.slice(1);
      const hashQuery = new URLSearchParams(hash);
      setHashProps(Object.fromEntries(hashQuery));
    };

    updateHashProps();

    router.events.on('routeChangeComplete', updateHashProps);
    window.addEventListener('hashchange', updateHashProps);

    return () => {
      router.events.off('routeChangeComplete', updateHashProps);
      window.removeEventListener('hashchange', updateHashProps);
    };
  }, [path, router]);

  return hashProps;
};

export default useHashProps;
