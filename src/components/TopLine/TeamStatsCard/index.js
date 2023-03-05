import Timeouts from './Timeouts';
import Fouls from './Fouls';
import Possession from './Possession';
import styles from './styles.module.scss';

const TeamStatsCard = function TeamStatsCard(props) {
  const {
    team,
    state,
  } = props;

  const {
    teamId,
    timeoutsRemaining,
    inBonus,
  } = team;

  const isInBonus = inBonus === '1';
  const {
    teamFouls = {},
  } = state || {};

  const hasPossession = state && state.possession === teamId;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Possession hasPossession={hasPossession} />
        <Fouls
          fouls={teamFouls[teamId]}
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
