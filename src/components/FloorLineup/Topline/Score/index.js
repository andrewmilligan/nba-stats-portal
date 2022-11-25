import gameStatusText from 'Utils/gameStatus/gameStatusText';
import { teamLogo } from 'Utils/data/urls';

import styles from './styles.module.scss';

const Score = function Score(props) {
  const {
    boxScore,
  } = props;

  const {
    homeTeam = {},
    awayTeam = {},
  } = boxScore;

  const status = gameStatusText(boxScore);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.score}>
          {homeTeam.score}
        </span>
        {' '}
        <span className={styles.to}>
          -
        </span>
        {' '}
        <span className={styles.score}>
          {awayTeam.score}
        </span>
      </div>
      <div className={styles.status}>
        {status}
      </div>
    </div>
  );
};

Score.defaultProps = {
  boxScore: {},
};

export default Score;
