import classnames from 'classnames';

import gameStatusText from 'Utils/gameStatus/gameStatusText';
import statusCodeToSlug from 'Utils/gameStatus/statusCodeToSlug';
import { ONGOING_CODE } from 'Utils/gameStatus/statuses';
import { teamLogo } from 'Utils/data/urls';

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

  const isLive = gameStatus === ONGOING_CODE;
  const status = gameStatusText(boxScore);
  const statusSlug = statusCodeToSlug(gameStatus);

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
        <div>
          {status}
        </div>
        <div
          className={classnames(
            styles.statusIndicator,
            styles[statusSlug],
          )}
        />
      </div>
    </div>
  );
};

Score.defaultProps = {
  boxScore: {},
};

export default Score;
