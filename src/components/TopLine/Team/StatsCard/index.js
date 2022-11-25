import Timeouts from './Timeouts';
import Fouls from './Fouls';
import styles from './styles.module.scss';

const StatsCard = function StatsCard(props) {
  const {
    team,
  } = props;

  const {
    timeoutsRemaining,
    inBonus,
    statistics: {
      foulsTeam,
    },
  } = team;

  const isInBonus = inBonus === '1';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Fouls
          fouls={foulsTeam}
          isInBonus={isInBonus}
        />
      </div>

      <Timeouts timeouts={timeoutsRemaining} />
    </div>
  );
};

StatsCard.defaultProps = {
  team: {
    statistics: {},
  },
};

export default StatsCard;
