import { useState, useCallback } from 'react';
import classnames from 'classnames';
import ErrorBoundary from 'Components/ErrorBoundary';
import Stepper from './Stepper';
import styles from './styles.module.scss';

const PlayByPlay = function PlayByPlay(props) {
  const {
    game,
    playByPlay,
    league,
  } = props;

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => {
    setExpanded((old) => !old);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Play-by-Play
      </div>
      <div
        className={classnames(
          styles.inner,
          { [styles.expanded]: expanded },
        )}
      >
        <div
          className={classnames(
            styles.expandable,
            { [styles.expanded]: expanded },
          )}
        >
          <div className={styles.content}>
            <ErrorBoundary resetKeys={[playByPlay]}>
              <Stepper
                game={game}
                playByPlay={playByPlay}
                league={league}
              />
            </ErrorBoundary>
          </div>
        </div>
        <button
          type="button"
          className={classnames(styles.button, styles.expand)}
          onClick={toggleExpanded}
        >
          {expanded ? '-' : '+'}
        </button>
      </div>
    </div>
  );
};

PlayByPlay.defaultProps = {
  playByPlay: [],
};

export default PlayByPlay;
