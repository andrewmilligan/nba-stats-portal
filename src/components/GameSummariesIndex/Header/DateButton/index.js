import formatUTCDate from 'Utils/dates/formatUTCDate';

import styles from './styles.module.scss';

const DateButton = function DateButton(props) {
  const {
    date,
    direction,
  } = props;

  const label = [
    direction === 'backward' && '←',
    date && formatUTCDate(date, '{apday}'),
    direction === 'forward' && '→',
  ].filter(Boolean).join(' ');

  return (
    <div>
      {!!date && (
        <a
          className={styles.button}
          href={`#date=${date}`}
        >
          {label}
        </a>
      )}
    </div>
  );
};

export default DateButton;
