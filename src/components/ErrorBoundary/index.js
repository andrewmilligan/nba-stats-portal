import React from 'react';
import PropTypes from 'prop-types';
import ErrorFallback from 'Components/ErrorFallback';

/**
 * Helper function to evaluate when the boundary's reset keys have changed. It
 * uses a strict equality check, so objects, arrays, and functions need to be
 * appropriately memoized.
 */
const changedArray = (a = [], b = []) => {
  if (a.length !== b.length) return true;
  return a.some((el, i) => el !== b[i]);
};

const initialState = {
  error: null,
};

/**
 * A [React error boundary][boundary] that can be used to prevent rendering
 * errors from crashing your entire application. This can be especially useful
 * when building modular applications made up of discrete chunks of
 * functionality because it allows you to prevent a bug in one small part of
 * your application from crashing the whole thing.
 *
 * Note that due to a limitation of Storybook you will still see the Storybook
 * error overlay when the example throws an error, even though the error is
 * being caught by the error boundary. You can dismiss the error overlay by
 * clicking "Close" at the bottom of the overlay and see the fallback content.
 *
 * ```js
 *
 * import { ErrorBoundary } from '@politico/interactive-style';
 * ```
 *
 * [boundary]: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidUpdate(prevProps) {
    const { error } = this.state;
    const { resetKeys } = this.props;

    if (error && changedArray(prevProps.resetKeys, resetKeys)) {
      this.reset();
    }
  }

  componentDidCatch(error, errorInfo) {
    const { onError } = this.props;
    if (onError) onError(error, errorInfo);
  }

  resetErrorBoundary(...args) {
    this.reset(...args);
  }

  reset(...args) {
    const { onReset } = this.props;
    if (onReset) onReset(...args);
    this.setState({ ...initialState });
  }

  render() {
    const {
      error,
    } = this.state;

    const {
      fallback,
      children,
    } = this.props;

    if (error) {
      if (typeof fallback === 'function') {
        const props = {
          error,
          resetErrorBoundary: this.resetErrorBoundary,
        };
        const Component = fallback;
        return (
          <Component {...props} />
        );
      }

      return fallback;
    }

    return children;
  }
}

ErrorBoundary.defaultProps = {
  onError: () => {},
  onReset: () => {},
  resetKeys: [],
  fallback: ErrorFallback,
};

ErrorBoundary.propTypes = {
  /**
   * A callback function that is called when this error boundary catches an
   * error from its children. It is called with the same arguments that are
   * [passed to `componentDidCatch`][cdc].
   *
   * [cdc]: https://legacy.reactjs.org/docs/react-component.html#componentdidcatch
   */
  onError: PropTypes.func,
  /**
   * A callback function that is called when the boundary's fallback triggers
   * a reset by calling the `resetErrorBoundary` function that gets passed to
   * it. The `resetErrorBoundary` function is only available if the `fallback`
   * is an element type, in which case it will get rendered with the props
   * `error` and `resetErrorBoundary` when a fallback is required.
   *
   * The `onReset` callback is also called when the error boundary
   * automatically resets based on its `resetKeys` array.
   */
  onReset: PropTypes.func,
  /**
   * A dependency array, like those passed to hooks like `useEffect` or
   * `useMemo` that will tell the boundary when to attempt an automatic reset.
   * This can be useful if your application has a live-updating data feed and
   * an error state caused by a bug might be temporary and might fix itself
   * when a new set of props are passed in. Note that, like in dependency
   * arrays for hooks, items are compared using strict equality, so objects,
   * functions, and arrays might cause the boundary to reset prematurely if
   * they aren't appropriately memoized.
   */
  resetKeys: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  /**
   * Some fallback content to render in the case of an error. This can be
   * provided as a pre-rendered node of content or as an element type that will
   * be rendered as necessary. An element type will be rendered with two props:
   * - `error` is the actual error that the boundary caught, and
   * - `resetErrorBoundary` is a function that the fallback component can call
   *   to reset the error boundary.
   */
  fallback: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.elementType,
  ]),
  /**
   * The children to render inside the error boundary. The boundary will catch
   * synchronous rendering errors thrown from within its children.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default ErrorBoundary;
