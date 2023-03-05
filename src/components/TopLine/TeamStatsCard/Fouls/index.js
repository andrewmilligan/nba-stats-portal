import classnames from 'classnames';

import styles from './styles.module.scss';

const Fouls = function Fouls(props) {
  const {
    fouls,
    isInBonus,
  } = props;

  return (
    <div>
      Team Fouls:
      {' '}
      {!isInBonus && fouls}
      {isInBonus && (
        <span className={styles.bonus}>
          Bonus
        </span>
      )}
    </div>
  );
};

Fouls.defaultProps = {
  fouls: 0,
};

export default Fouls;
