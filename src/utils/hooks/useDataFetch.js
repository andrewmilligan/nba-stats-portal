import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

const useDataFetch = function useDataFetch(url, opts = {}) {
  const {
    initial,
    interval,
  } = opts;

  const loadedUrl = useRef();
  const fetchHeaders = useRef({});
  const [data, setData] = useState(initial);

  const fetchData = useCallback(async () => {
    if (!url) return;

    const {
      lastModified,
    } = fetchHeaders.current;
    const headers = {};
    if (url === loadedUrl.current && lastModified) {
      headers['If-Modified-Since'] = lastModified;
    }

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        return;
      }

      fetchHeaders.current.lastModified = response.headers.get('Last-Modified');
      const contentType = response.headers.get('Content-Type');

      if (contentType === 'application/json') {
        setData(await response.json());
      } else {
        setData(await response.text());
      }

      loadedUrl.current = url;
    } catch (error) {
      // pass
    }
  }, [url]);

  useEffect(() => {
    let timer;
    const poll = async () => {
      await fetchData();
      if (interval) {
        timer = setTimeout(poll, interval);
      }
    };
    poll();
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [fetchData, interval]);

  return {
    data,
    fetchData,
    isLoadingNewData: loadedUrl.current !== url,
  };
};

export default useDataFetch;
