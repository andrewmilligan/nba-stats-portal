import Timeouts from './Timeouts';
import Fouls from './Fouls';
import styles from './styles.module.scss';

const TeamStatsCard = function TeamStatsCard(props) {
  const {
    team,
    state,
    otherTeam,
  } = props;

  const {
    teamId,
    timeoutsRemaining,
    inBonus,
  } = team;

  // pointsFastBreak
  // pointsFromTurnovers
  // pointsInThePaint
  // pointsSecondChance

  const {
    inBonus: otherTeamInBonus,
  } = otherTeam;

  const isInBonus = inBonus === '1';
  const otherTeamIsInBonus = otherTeamInBonus === '1';
  const {
    teamFouls = {},
  } = state || {};

  const hasPossession = state && state.possession === teamId;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Fouls
          fouls={teamFouls[teamId]}
          isInBonus={isInBonus}
          otherTeamIsInBonus={otherTeamIsInBonus}
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
