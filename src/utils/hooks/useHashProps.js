import { useState, useEffect } from 'react';

const useHashProps = function useHashProps() {
  const [hashProps, setHashProps] = useState({});

  useEffect(() => {
    const updateHashProps = () => {
      const hash = window.location.hash.slice(1);
      const hashQuery = new URLSearchParams(hash);
      setHashProps(Object.fromEntries(hashQuery));
    };

    updateHashProps();
    window.addEventListener('hashchange', updateHashProps);
    return () => window.removeEventListener('hashchange', updateHashProps);
  }, []);

  return hashProps;
};

export default useHashProps;
