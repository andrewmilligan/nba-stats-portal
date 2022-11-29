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

  const fetchId = useRef();
  const [loadedUrl, setLoadedUrl] = useState();
  const fetchHeaders = useRef({});
  const [data, setData] = useState(initial);

  const fetchData = useCallback(async (uid) => {
    if (!url) return;
    if (uid !== fetchId.current) return;

    const {
      lastModified,
    } = fetchHeaders.current;
    const isFirstPoll = !lastModified;
    const headers = {};
    if (lastModified) {
      headers['If-Modified-Since'] = lastModified;
    }

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`bad response from ${url}`);
      }

      fetchHeaders.current.lastModified = response.headers.get('Last-Modified');
      const contentType = response.headers.get('Content-Type');

      if (contentType === 'application/json') {
        setData(await response.json());
      } else {
        setData(await response.text());
      }
    } catch (error) {
      if (isFirstPoll) {
        setData(initial);
      }
    } finally {
      setLoadedUrl(url);
    }
  }, [url, initial]);

  useEffect(() => {
    fetchHeaders.current = {};
    const uid = Date.now();
    fetchId.current = uid;
    let timer;
    const poll = async () => {
      if (!url) return;
      if (fetchId.current !== uid) return;
      await fetchData(uid);
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
  }, [url, fetchData, interval]);

  return {
    data,
    fetchData,
    isLoadingNewData: loadedUrl !== url,
  };
};

export default useDataFetch;
