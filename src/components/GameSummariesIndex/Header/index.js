import formatUTCDate from 'Utils/dates/formatUTCDate';

import DateButton from './DateButton';
import styles from './styles.module.scss';

const Header = function Header(props) {
  const {
    gameDate,
    nextDate,
    previousDate,
  } = props;

  if (!gameDate) return null;

  return (
    <div className={styles.container}>
      <DateButton
        date={previousDate}
        direction="backward"
      />

      <div className={styles.title}>
        <span className={styles.preamble}>
          Games on
          {' '}
        </span>
        <span className={styles.date}>
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
