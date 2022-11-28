import Timeouts from './Timeouts';
import Fouls from './Fouls';
import styles from './styles.module.scss';

const TeamStatsCard = function TeamStatsCard(props) {
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

TeamStatsCard.defaultProps = {
  team: {
    statistics: {},
  },
};

export default TeamStatsCard;
