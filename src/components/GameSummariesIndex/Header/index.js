import formatUTCDate from 'Utils/dates/formatUTCDate';

import DateButton from './DateButton';
import styles from './styles.module.scss';

const Header = function Header(props) {
  const {
    gameDate,
    nextDate,
    previousDate,
    selectNextDate,
    selectPreviousDate,
  } = props;

  if (!gameDate) return null;

  return (
    <div className={styles.container}>
      <DateButton
        date={previousDate}
        selectDate={selectPreviousDate}
      />

      <div>
        Games on
        {' '}
        <span className={styles.date}>
          {formatUTCDate(gameDate, '{weekday}, {apday}')}
        </span>
      </div>

      <DateButton
        date={nextDate}
        selectDate={selectNextDate}
      />
    </div>
  );
};

export default Header;
