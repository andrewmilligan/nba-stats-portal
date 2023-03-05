import classnames from 'classnames';

import styles from './styles.module.scss';

const Fouls = function Fouls(props) {
  const {
    fouls,
    isInBonus,
    otherTeamIsInBonus,
  } = props;

  return (
    <div className={styles.container}>
      {!otherTeamIsInBonus && (
        <div>
          {`Team Fouls: ${fouls}`}
        </div>
      )}
      {isInBonus && (
        <div className={styles.bonus}>
          Bonus
        </div>
      )}
    </div>
  );
};

Fouls.defaultProps = {
  fouls: 0,
};

export default Fouls;
