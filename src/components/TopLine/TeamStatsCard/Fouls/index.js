import classnames from 'classnames';

import styles from './styles.module.scss';

const Fouls = function Fouls(props) {
  const {
    fouls,
    isInBonus,
  } = props;

  if (isInBonus) {
    return (
      <div className={styles.bonus}>
        Bonus
      </div>
    );
  }

  return (
    <div>
      {`Fouls: ${fouls}`}
    </div>
  );
};

Fouls.defaultProps = {
  fouls: 0,
};

export default Fouls;
