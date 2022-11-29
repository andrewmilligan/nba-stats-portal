import classnames from 'classnames';

import styles from './styles.module.scss';

const Fouls = function Fouls(props) {
  const {
    fouls,
    isInBonus,
  } = props;

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.labelLong}>
          Total Fouls:
        </span>
        <span className={styles.labelShort}>
          Fouls:
        </span>
        {' '}
        <span className={styles.fouls}>
          {fouls}
        </span>
      </div>
      <div className={styles.bonus}>
        {isInBonus && 'Bonus'}
      </div>
    </div>
  );
};

Fouls.defaultProps = {
  fouls: 0,
};

export default Fouls;
