import classnames from 'classnames';

import styles from './styles.module.scss';

const Fouls = function Fouls(props) {
  const {
    fouls,
    isInBonus,
    otherTeamIsInBonus,
  } = props;

  if (typeof fouls === 'undefined') {
    return null;
  }

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

export default Fouls;
