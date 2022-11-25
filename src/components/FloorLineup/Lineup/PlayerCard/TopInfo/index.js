import classnames from 'classnames';

import playerMinutes from 'Utils/clock/playerMinutes';

import styles from './styles.module.scss';

const TopInfo = function TopInfo(props) {
  const {
    player,
  } = props;

  const {
    status,
    name,
    jerseyNum,
    statistics: {
      minutes,
      plusMinusPoints,
    },
  } = player;

  const isInactive = status === 'INACTIVE';

  const { formattedMinutesSeconds } = playerMinutes(minutes);

  const plusMinus = plusMinusPoints < 0
    ? plusMinusPoints
    : `+${plusMinusPoints}`;

  return (
    <div className={styles.topline}>
      <div className={styles.name}>
        {name}
        {' '}
        <span className={styles.jersey}>
          {`#${jerseyNum}`}
        </span>
      </div>
      {isInactive && (
        <div className={styles.minutes}>
          Inactive
        </div>
      )}
      {!isInactive && (
        <div className={styles.minutes}>
          {formattedMinutesSeconds}
          {' '}
          <span
            className={classnames(
              styles.plusminus,
              {
                [styles.positive]: plusMinusPoints > 0,
                [styles.negative]: plusMinusPoints < 0,
              },
            )}
          >
            {plusMinus}
          </span>
        </div>
      )}
    </div>
  );
};

export default TopInfo;
