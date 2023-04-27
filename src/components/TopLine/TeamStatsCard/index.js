import { ordinal } from 'journalize';
import teams from 'Utils/teams/metadata';
import Timeouts from './Timeouts';
import Fouls from './Fouls';
import styles from './styles.module.scss';

const TeamStatsCard = function TeamStatsCard(props) {
  const {
    team,
    teamMeta,
    state,
    otherTeam,
  } = props;

  const {
    teamId,
    timeoutsRemaining,
    inBonus,
  } = team;

  const {
    pointsFastBreak,
    pointsFromTurnovers,
    pointsInThePaint,
    pointsSecondChance,
    turnovers,
  } = team.statistics;

  const {
    inBonus: otherTeamInBonus,
  } = otherTeam;

  const isInBonus = inBonus === '1';
  const otherTeamIsInBonus = otherTeamInBonus === '1';
  const {
    teamFouls = {},
  } = state || {};

  const hasPossession = state && state.possession === teamId;

  const {
    seed,
  } = teamMeta;
  const conferenceNames = {
    eastern: 'East',
    western: 'West',
  };
  const conference = conferenceNames[teams.get(teamId).conference];

  return (
    <div className={styles.container}>
      {teamMeta.seed && (
        <div className={styles.seed}>
          <span className={styles.seedNum}>
            {`${ordinal(seed)}`}
          </span>
          {' '}
          <span>
            {`in the ${conference}`}
          </span>
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.stats}>
          <div>
            In paint:
          </div>
          <div className={styles.stat}>
            {pointsInThePaint}
          </div>
          <div>
            2nd chance:
          </div>
          <div className={styles.stat}>
            {pointsSecondChance}
          </div>
          <div>
            Fast break:
          </div>
          <div className={styles.stat}>
            {pointsFastBreak}
          </div>
          <div>
            Turnovers:
          </div>
          <div className={styles.stat}>
            {turnovers}
          </div>
        </div>
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
