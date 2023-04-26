import classnames from 'classnames';

import gameStatusTextFromState from 'Utils/gameStatus/gameStatusTextFromState';
import { teamLogo } from 'Utils/data/urls';
import StatusIndicator from 'Components/StatusIndicator';

import SeriesStatus from './SeriesStatus';
import styles from './styles.module.scss';

const Score = function Score(props) {
  const {
    game,
  } = props;

  const {
    state,
    boxScore: {
      gameStatus,
    },
  } = game;

  const {
    scoreHome,
    scoreAway,
  } = state;

  const status = gameStatusTextFromState(state);

  return (
    <div className={styles.container}>
      <SeriesStatus game={game} />
      <div className={styles.content}>
        <span className={styles.score}>
          {scoreAway}
        </span>
        {' '}
        <span className={styles.to}>
          -
        </span>
        {' '}
        <span className={styles.score}>
          {scoreHome}
        </span>
      </div>
      <div className={styles.status}>
        <div className={styles.text}>
          <div>
            {status.text}
          </div>
          <StatusIndicator gameStatus={gameStatus} />
        </div>
        <div className={styles.subtext}>
          {status.subtext}
        </div>
      </div>
    </div>
  );
};

Score.defaultProps = {
  boxScore: {},
  isUpcoming: true,
};

export default Score;
