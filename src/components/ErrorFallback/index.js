import { useState, useCallback } from 'react';
import styles from './styles.module.scss';

const ErrorFallback = function ErrorFallback(props) {
  const {
    error,
    resetErrorBoundary,
  } = props;

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => {
    setExpanded((old) => !old);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Error
      </h2>
      <div className={styles.error}>
        <div className={styles.message}>
          {error.message}
        </div>
        {expanded && (
          <div className={styles.trace}>
            {error.stack}
          </div>
        )}
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={toggleExpanded}
        >
          {expanded ? 'Hide trace' : 'Show trace'}
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={resetErrorBoundary}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
