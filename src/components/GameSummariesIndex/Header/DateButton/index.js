import classnames from 'classnames';

import formatUTCDate from 'Utils/dates/formatUTCDate';

import styles from './styles.module.scss';

const DateButton = function DateButton(props) {
  const {
    date,
    selectDate,
  } = props;

  return (
    <div>
      {!!date && (
        <button
          type="button"
          className={classnames(
            styles.button,
            { [styles.disabled]: !selectDate },
          )}
          disabled={!selectDate}
          onClick={selectDate}
        >
          {formatUTCDate(date, '{apday}')}
        </button>
      )}
    </div>
  );
};

export default DateButton;
