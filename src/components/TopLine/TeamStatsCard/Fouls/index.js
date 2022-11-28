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
        {`Total Fouls: ${fouls}`}
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
