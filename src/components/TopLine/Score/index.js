import classnames from 'classnames';

import gameStatusTextFromState from 'Utils/gameStatus/gameStatusTextFromState';
import { teamLogo } from 'Utils/data/urls';
import StatusIndicator from 'Components/StatusIndicator';

import styles from './styles.module.scss';

const Score = function Score(props) {
  const {
    state,
    isUpcoming,
  } = props;

  const {
    gameStatus,
    scoreHome,
    scoreAway,
  } = state;

  const status = gameStatusTextFromState(state);

  return (
    <div className={styles.container}>
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
        <div>
          {status}
        </div>
        <StatusIndicator gameStatus={gameStatus} />
      </div>
    </div>
  );
};

Score.defaultProps = {
  boxScore: {},
  isUpcoming: true,
};

export default Score;
