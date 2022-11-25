import TeamLogo from './TeamLogo';
import Score from './Score';
import styles from './styles.module.scss';

const Topline = function Topline(props) {
  const {
    boxScore,
  } = props;

  const {
    homeTeam,
    awayTeam,
  } = boxScore;

  console.log(boxScore);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <TeamLogo team={homeTeam} />
        <Score boxScore={boxScore} />
        <TeamLogo team={awayTeam} />
      </div>
    </div>
  );
};

Topline.defaultProps = {
  boxScore: {},
};

export default Topline;
