import StatViolin from './StatViolin';
import styles from './styles.module.scss';

const ExtendedStats = function ExtendedStats(props) {
  const {
    player,
    seasonBoxScores,
  } = props;

  console.log(seasonBoxScores);

  if (!seasonBoxScores) {
    return (
      <div className={styles.noStats}>
        No stats available
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.divider} />
      <div className={styles.sectionTitle}>
        Scoring
      </div>
      <div className={styles.stats}>
        <StatViolin
          seasonBoxScores={seasonBoxScores}
          current={player.statistics.points}
          stat="points"
          label="PTS"
        />
        <StatViolin
          seasonBoxScores={seasonBoxScores}
          current={player.statistics.fieldGoalsPercentage}
          stat="fieldGoalsPercentage"
          label="FGP"
          formatLabel={(x) => `${Math.round(x * 100)}%`}
        />
        <StatViolin
          seasonBoxScores={seasonBoxScores}
          current={player.statistics.threePointersPercentage}
          stat="threePointersPercentage"
          label="3PP"
          formatLabel={(x) => `${Math.round(x * 100)}%`}
        />
        <StatViolin
          seasonBoxScores={seasonBoxScores}
          current={player.statistics.freeThrowsPercentage}
          stat="freeThrowsPercentage"
          label="FTP"
          formatLabel={(x) => `${Math.round(x * 100)}%`}
        />
      </div>

      <div className={styles.divider} />
      <div className={styles.sectionTitle}>
        Rebounding
      </div>
      <div className={styles.stats}>
        <StatViolin
          seasonBoxScores={seasonBoxScores}
          current={player.statistics.reboundsDefensive}
          stat="reboundsDefensive"
          label="DRB"
        />
        <StatViolin
          seasonBoxScores={seasonBoxScores}
          current={player.statistics.reboundsOffensive}
          stat="reboundsOffensive"
          label="ORB"
        />
      </div>

      <div className={styles.divider} />
      <div className={styles.sectionTitle}>
        Other
      </div>
      <div className={styles.stats}>
        <StatViolin
          seasonBoxScores={seasonBoxScores}
          current={player.statistics.assists}
          stat="assists"
          label="AST"
        />
        <StatViolin
          seasonBoxScores={seasonBoxScores}
          current={player.statistics.blocks}
          stat="blocks"
          label="BLK"
        />
        <StatViolin
          seasonBoxScores={seasonBoxScores}
          current={player.statistics.plusMinusPoints}
          stat="plusMinusPoints"
          label="+/-"
        />
      </div>
    </div>
  );
};

export default ExtendedStats;
