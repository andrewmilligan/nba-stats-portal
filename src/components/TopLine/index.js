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
  } = props;

  const {
    state,
    boxScore,
  } = game;

  const {
    homeTeam,
    awayTeam,
  } = boxScore || gameMetadata;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.awayTeamName}>
          <TeamName team={awayTeam} />
        </div>

        <div className={styles.awayTeamStats}>
          {!isUpcoming && (
            <TeamStatsCard team={awayTeam} />
          )}
        </div>

        <div className={styles.homeTeamName}>
          <TeamName team={homeTeam} />
        </div>

        <div className={styles.homeTeamStats}>
          {!isUpcoming && (
            <TeamStatsCard team={homeTeam} />
          )}
        </div>

        <div className={styles.score}>
          {isUpcoming ? (
            <UpcomingStatus
              game={gameMetadata}
            />
          ) : (
            <Score
              gameStatus={boxScore.gameStatus}
              state={state}
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
