import TeamName from './TeamName';
import TeamStatsCard from './TeamStatsCard';
import Score from './Score';
import UpcomingStatus from './UpcomingStatus';
import styles from './styles.module.scss';

const TopLine = function TopLine(props) {
  const {
    game,
    gameMetadata,
    isUpcoming,
    league,
  } = props;

  const {
    state,
    boxScore,
    metadata = gameMetadata,
  } = game;

  const {
    homeTeam: homeTeamMeta,
    awayTeam: awayTeamMeta,
  } = metadata;

  const {
    homeTeam,
    awayTeam,
  } = boxScore || metadata;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.awayTeamName}>
          <TeamName
            team={awayTeam}
            state={state}
            side="awayTeam"
            league={league}
          />
        </div>

        <div className={styles.awayTeamStats}>
          {!isUpcoming && (
            <TeamStatsCard
              team={awayTeam}
              teamMeta={awayTeamMeta}
              state={state}
              otherTeam={homeTeam}
              league={league}
            />
          )}
        </div>

        <div className={styles.homeTeamName}>
          <TeamName
            team={homeTeam}
            state={state}
            side="homeTeam"
            league={league}
          />
        </div>

        <div className={styles.homeTeamStats}>
          {!isUpcoming && (
            <TeamStatsCard
              team={homeTeam}
              teamMeta={homeTeamMeta}
              state={state}
              otherTeam={awayTeam}
              league={league}
            />
          )}
        </div>

        <div className={styles.score}>
          {isUpcoming ? (
            <UpcomingStatus
              game={gameMetadata}
            />
          ) : (
            <Score
              game={game}
              league={league}
            />
          )}
        </div>

      </div>
    </div>
  );
};

TopLine.defaultProps = {
  gameInSchedule: {},
  isUpcoming: true,
};

export default TopLine;
