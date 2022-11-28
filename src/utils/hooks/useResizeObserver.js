import {
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';

/**
 * Hook to attach a ResizeObserver to a DOM node with a callback ref so that
 * the observer can be updated when React reattaches the ref to a new DOM node.
 *
 * @param {Object} opts
 * @param {Ref} [ref]
 *        A React Ref to attach to the DOM node if you want more control over
 *        which ref is used or need direct access to the ref itself.
 * @param {number[]} [initialSize=[0,0]]
 *        The initial size to use for the node before any measurements have
 *        been taken
 * @returns {[function, [number, number]]}
 */
const useResizeObserver = function useResizeObserver(opts = {}) {
  const defaultRef = useRef();

  const {
    ref = defaultRef,
    initialSize = [0, 0],
  } = opts;

  const observer = useRef();

  // We keep track of when the ref is reattached with a dummy piece of state
  const [refReattached, setRefReattached] = useState({});
  const [dimensions, setDimensions] = useState(initialSize);

  // Reobserve our node every time React swaps it out for a new one
  useEffect(() => {
    observer.current = new window.ResizeObserver(() => {
      const dom = ref.current;
      if (dom) {
        setDimensions([dom.clientWidth, dom.clientHeight]);
      }
    });

    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      observer.current.disconnect();
    };
  }, [ref, refReattached]);

  // Callback ref to monitor when the DOM node changes
  const refCallback = useCallback((node) => {
    ref.current = node;
    setRefReattached(() => ({}));
  }, [ref]);

  return [refCallback, dimensions];
};

export default useResizeObserver;
