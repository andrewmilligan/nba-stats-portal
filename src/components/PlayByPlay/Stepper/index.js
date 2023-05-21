import { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import separatePlays from 'Utils/plays/separatePlays';
import PlaySequence from 'Components/PlaySequence';
import playIcon from './play.svg';
import pauseIcon from './pause.svg';
import styles from './styles.module.scss';

const Stepper = function Stepper(props) {
  const {
    game,
    playByPlay,
    league,
  } = props;

  const [waiting, setWaiting] = useState(true);

  // const [numPlays, setNumPlays] = useState(0);
  // useEffect(() => {
  //   setTimeout(() => setNumPlays((old) => old + 30), 5000);
  // }, [numPlays]);
  // const plays = separatePlays(playByPlay.slice(0, numPlays));
  const plays = separatePlays(playByPlay);

  const sequences = plays.filter((p) => p.length > 0);
  const numSequences = sequences.length;

  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(sequences.length - 1);
  const forward = useCallback(() => {
    setIndex(Math.min(index + 1, numSequences - 1));
    setPlaying(index + 1 >= numSequences - 1);
  }, [index, numSequences]);
  const backward = useCallback(() => {
    setIndex((oldIndex) => oldIndex - 1);
    setPlaying(false);
  }, []);
  const onPlay = useCallback(() => {
    setPlaying((old) => !old);
  }, []);
  const toBeginning = useCallback(() => {
    setIndex(0);
  }, []);
  const toEnd = useCallback(() => {
    setIndex(numSequences - 1);
    setPlaying(true);
  }, [numSequences]);

  useEffect(() => {
    if (!waiting) return;
    const timer = setTimeout(() => setWaiting(false), 4000);
    return () => clearTimeout(timer);
  }, [waiting]);

  useEffect(() => {
    if (!playing) return;
    if (waiting) return;
    if (index >= numSequences - 1) return;
    setWaiting(true);
    setIndex(index + 1);
  }, [playing, index, numSequences, waiting]);

  return (
    <div
      className={classnames(
        styles.content,
      )}
    >
      <div className={styles.actions}>
        {sequences[index] && (
          <PlaySequence
            key={index}
            plays={sequences[index]}
            game={game}
            league={league}
          />
        )}
      </div>
      <div className={styles.controls}>
        <div className={styles.autoplay}>
          <button
            type="button"
            className={classnames(styles.button, styles.back)}
            onClick={toBeginning}
            disabled={index < 1}
          >
            Beginning
          </button>
          <button
            type="button"
            className={classnames(styles.button, styles.back)}
            onClick={backward}
            disabled={index < 1}
          >
            Back
          </button>
        </div>

        <div className={styles.autoplay}>
          <button
            type="button"
            className={classnames(styles.button, styles.forward)}
            onClick={forward}
            disabled={index >= sequences.length - 1}
          >
            Next
          </button>

          <button
            type="button"
            className={classnames(styles.button, styles.forward)}
            onClick={toEnd}
            disabled={index >= sequences.length - 1}
          >
            End
          </button>

          <button
            type="button"
            title={playing ? 'Pause' : 'Play'}
            className={classnames(styles.button, styles.play)}
            onClick={onPlay}
          >
            <img
              src={playing ? pauseIcon.src : playIcon.src}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

Stepper.defaultProps = {
  playByPlay: [],
};

export default Stepper;
