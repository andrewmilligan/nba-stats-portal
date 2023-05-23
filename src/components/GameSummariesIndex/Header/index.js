import classnames from 'classnames';
import formatUTCDate from 'Utils/dates/formatUTCDate';

import DateButton from './DateButton';
import styles from './styles.module.scss';

const Header = function Header(props) {
  const {
    gameDate,
    nextDate,
    previousDate,
    league,
  } = props;

  if (!gameDate) return null;

  return (
    <div className={styles.container}>
      <DateButton
        date={previousDate}
        direction="backward"
      />

      <div className={styles.title}>
        <span>
          {league.toUpperCase()}
          {' '}
        </span>
        <span className={styles.desktop}>
          Games on
          {' '}
        </span>
        <span
          className={classnames(
            styles.date,
            styles.mobile,
          )}
        >
          {formatUTCDate(gameDate, '{apday}')}
        </span>
        <span
          className={classnames(
            styles.date,
            styles.desktop,
          )}
        >
          {formatUTCDate(gameDate, '{weekday}, {apday}')}
        </span>
      </div>

      <DateButton
        date={nextDate}
        direction="forward"
      />
    </div>
  );
};

export default Header;
