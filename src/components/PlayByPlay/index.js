import { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';

import Action from './Action';
import styles from './styles.module.scss';

const PlayByPlay = function PlayByPlay(props) {
  const {
    playByPlay,
  } = props;

  const [atEnd, setAtEnd] = useState(true);
  const [index, setIndex] = useState(playByPlay.length - 1);
  const forward = useCallback(() => {
    setIndex((oldIndex) => oldIndex + 1);
  }, []);
  const backward = useCallback(() => {
    setIndex((oldIndex) => oldIndex - 1);
  }, []);

  useEffect(() => {
    if (!atEnd) return;
    setIndex(playByPlay.length - 1);
  }, [atEnd, playByPlay]);

  useEffect(() => {
    setAtEnd(index === playByPlay.length - 1);
  }, [playByPlay, index]);

  return (
    <div className={styles.container}>
      {index > 0 && (
        <button
          type="button"
          className={classnames(styles.button, styles.back)}
          onClick={backward}
        >
          Back
        </button>
      )}
      <div className={styles.actions}>
        {playByPlay[index] && (
          <Action
            action={playByPlay[index]}
          />
        )}
      </div>
      {index < playByPlay.length - 1 && (
        <button
          type="button"
          className={classnames(styles.button, styles.forward)}
          onClick={forward}
        >
          Next
        </button>
      )}
    </div>
  );
};

PlayByPlay.defaultProps = {
  playByPlay: [],
};

export default PlayByPlay;
