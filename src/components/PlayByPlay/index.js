import { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import separatePlays from 'Utils/plays/separatePlays';
import PlaySequence from 'Components/PlaySequence';
import Action from './Action';
import styles from './styles.module.scss';

const PlayByPlay = function PlayByPlay(props) {
  const {
    game,
    playByPlay,
  } = props;

  const [expanded, setExpanded] = useState(false);

  const [numPlays, setNumPlays] = useState(0);
  useEffect(() => {
    setTimeout(() => setNumPlays((old) => old + 1), 5000);
  }, [numPlays]);

  // const plays = separatePlays(playByPlay.slice(0, numPlays));
  const plays = separatePlays(playByPlay);

  const sequences = plays.filter((p) => p.length > 0);
  const numSequences = sequences.length;

  const [atEnd, setAtEnd] = useState(true);
  const [index, setIndex] = useState(playByPlay.length - 1);
  const forward = useCallback(() => {
    setIndex((oldIndex) => Math.min(oldIndex + 1, numSequences - 1));
  }, [numSequences]);
  const backward = useCallback(() => {
    setIndex((oldIndex) => oldIndex - 1);
  }, []);

  useEffect(() => {
    if (!atEnd) return;
    setIndex(numSequences - 1);
  }, [atEnd, numSequences]);

  useEffect(() => {
    setAtEnd(index === numSequences - 1);
  }, [numSequences, index]);

  return (
    <div
      className={classnames(
        styles.container,
        { [styles.expanded]: expanded },
      )}
    >
      <div className={styles.title}>
        Play-by-Play
      </div>
      <div
        className={classnames(
          styles.content,
          { [styles.expanded]: expanded },
        )}
      >
        <div className={styles.actions}>
          {sequences[index] && (
            <PlaySequence
              key={index}
              plays={sequences[index]}
              game={game}
            />
          )}
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={classnames(styles.button, styles.back)}
            onClick={backward}
            disabled={index < 1}
          >
            Back
          </button>
          <button
            type="button"
            className={classnames(styles.button, styles.forward)}
            onClick={forward}
            disabled={index >= sequences.length - 1}
          >
            Next
          </button>
        </div>
      </div>
      <button
        type="button"
        className={classnames(styles.button, styles.expand)}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? '-' : '+'}
      </button>
    </div>
  );
};

PlayByPlay.defaultProps = {
  playByPlay: [],
};

export default PlayByPlay;
