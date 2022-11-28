import classnames from 'classnames';

import gameStatusText from 'Utils/gameStatus/gameStatusText';
import { teamLogo } from 'Utils/data/urls';
import StatusIndicator from 'Components/StatusIndicator';

import styles from './styles.module.scss';

const Score = function Score(props) {
  const {
    boxScore,
  } = props;

  const {
    gameStatus,
    homeTeam = {},
    awayTeam = {},
  } = boxScore;

  const status = gameStatusText(boxScore);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.score}>
          {awayTeam.score}
        </span>
        {' '}
        <span className={styles.to}>
          -
        </span>
        {' '}
        <span className={styles.score}>
          {homeTeam.score}
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
};

export default Score;
