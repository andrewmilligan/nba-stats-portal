import gameStatusText from 'Utils/gameStatus/gameStatusText';
import format from 'Utils/dates/format';

import styles from './styles.module.scss';

const UpcomingStatus = function UpcomingStatus(props) {
  const {
    game,
  } = props;

  const date = format(game.gameDateTime, '{apday}');
  const time = format(game.gameDateTime, '{aptime} {timezone}');

  return (
    <div className={styles.container}>
      <div className={styles.date}>
        {date}
      </div>
      <div className={styles.time}>
        {`at ${time}`}
      </div>
    </div>
  );
};

UpcomingStatus.defaultProps = {
  game: {},
};

export default UpcomingStatus;
