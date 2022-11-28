import TeamName from './TeamName';
import TeamStatsCard from './TeamStatsCard';
import Score from './Score';
import styles from './styles.module.scss';

const TopLine = function TopLine(props) {
  const {
    boxScore,
  } = props;

  const {
    homeTeam,
    awayTeam,
  } = boxScore;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.awayTeamName}>
          <TeamName team={awayTeam} />
        </div>

        <div className={styles.awayTeamStats}>
          <TeamStatsCard team={awayTeam} />
        </div>

        <div className={styles.homeTeamName}>
          <TeamName team={homeTeam} />
        </div>

        <div className={styles.homeTeamStats}>
          <TeamStatsCard team={homeTeam} />
        </div>

        <div className={styles.score}>
          <Score boxScore={boxScore} />
        </div>

      </div>
    </div>
  );
};

TopLine.defaultProps = {
  boxScore: {},
};

export default TopLine;
