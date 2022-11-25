import Team from './Team';
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
        <Team team={homeTeam} />
        <Score boxScore={boxScore} />
        <Team team={awayTeam} />
      </div>
    </div>
  );
};

TopLine.defaultProps = {
  boxScore: {},
};

export default TopLine;
